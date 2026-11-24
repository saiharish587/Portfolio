import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ExternalLink, ChevronDown, Zap, ZapOff } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// ─── Face transforms for a cube of given size ─────────────────────────────────
const faceTransforms = (size) => [
  `translateZ(${size / 2}px)`,                        // 0 front
  `rotateY(90deg) translateZ(${size / 2}px)`,         // 1 right
  `rotateY(180deg) translateZ(${size / 2}px)`,        // 2 back
  `rotateY(-90deg) translateZ(${size / 2}px)`,        // 3 left
  `rotateX(90deg) translateZ(${size / 2}px)`,         // 4 top
  `rotateX(-90deg) translateZ(${size / 2}px)`,        // 5 bottom
];

// ─── Rotation targets per face index ──────────────────────────────────────────
// Sequence designed as a smooth dice-tumble: front → right → back → left → top → bottom
const ROTATION_SEQUENCE = [
  { rotationX:   0, rotationY:   0 },   // 0 → face 0  (front)
  { rotationX:   0, rotationY: -90 },   // 1 → face 1  (right)
  { rotationX:   0, rotationY: -180 },  // 2 → face 2  (back)
  { rotationX:   0, rotationY: -270 },  // 3 → face 3  (left)
  { rotationX:  90, rotationY:   0 },   // 4 → face 4  (top)
  { rotationX: -90, rotationY:   0 },   // 5 → face 5  (bottom / empty)
];

// ─── Helper: build a padded array of exactly 6 face entries ───────────────────
const buildFaces = (projects) => {
  const out = projects.slice(0, 5).map((p, i) => ({
    id: `proj-${i}`,
    title: p.title,
    desc: p.desc,
    category: p.category,
    stack: p.stack,
    link: p.link,
    image: p.image,
    color: p.color,
  }));
  // 6th face is intentionally empty
  out.push({ id: 'empty', title: '', desc: '', category: '', stack: [], link: '#', image: null, color: '#1c1c1c' });
  return out;
};

// ─── Component ────────────────────────────────────────────────────────────────
export const ProjectsCube = () => {
  const { projects } = portfolioData;
  const faces = buildFaces(projects);

  // Refs
  const sectionRef   = useRef(null);
  const cubeRef      = useRef(null);
  const wrapperRef   = useRef(null);

  // Scroll-lock refs (no re-render needed for these)
  const globalActiveRef        = useRef(false);
  const snappedCenterRef       = useRef(null);
  const currentFaceRef         = useRef(0);
  const hasRotatedRef          = useRef(false);
  const wheelAccumRef          = useRef(0);
  const lastWheelTimeRef       = useRef(0);
  const passThroughRef         = useRef(false);     // last face seen → next scroll releases
  const topPassThroughRef      = useRef(false);     // back at face 0 → next scroll releases up
  const hasCompletedRef        = useRef(false);
  const hasExitedBackRef       = useRef(false);
  const lastScrollYRef         = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const bodyOverflowRef        = useRef(null);
  const htmlOverflowRef        = useRef(null);
  const ignoreFirstWheelRef    = useRef(false);
  const ignoreTimerRef         = useRef(null);
  const lastDirectionRef       = useRef(null);

  // React state
  const [activeFace, setActiveFace]   = useState(0);
  const [cubeMode, setCubeMode]       = useState(true); // toggle: true = cube mode, false = skip mode
  const [descVisible, setDescVisible] = useState(true);

  // ── Page scroll lock / unlock ──────────────────────────────────────────────
  const lockScroll = useCallback(() => {
    if (bodyOverflowRef.current !== null) return;
    bodyOverflowRef.current = document.body.style.overflow;
    htmlOverflowRef.current = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }, []);

  const unlockScroll = useCallback(() => {
    if (bodyOverflowRef.current === null) return;
    document.body.style.overflow = bodyOverflowRef.current || '';
    document.documentElement.style.overflow = htmlOverflowRef.current || '';
    bodyOverflowRef.current = null;
    htmlOverflowRef.current = null;
  }, []);

  // ── Animate cube to a face index ──────────────────────────────────────────
  const rotateTo = useCallback((faceIdx, onDone) => {
    if (!cubeRef.current) return;
    const target = ROTATION_SEQUENCE[faceIdx];
    gsap.to(cubeRef.current, {
      rotationX: target.rotationX,
      rotationY: target.rotationY,
      duration: 0.75,
      ease: 'power2.inOut',
      onComplete: onDone,
    });
  }, []);

  // ── Rotate one step forward or backward ──────────────────────────────────
  const rotateCube = useCallback((direction) => {
    if (hasRotatedRef.current) return;
    hasRotatedRef.current = true;
    lastDirectionRef.current = direction;

    if (direction === 'forward') {
      if (currentFaceRef.current >= 5) { hasRotatedRef.current = false; return; }
      currentFaceRef.current++;
    } else {
      if (currentFaceRef.current <= 0) { hasRotatedRef.current = false; return; }
      currentFaceRef.current--;
    }

    const nextFace = currentFaceRef.current;

    // Fade description out before face changes
    setDescVisible(false);

    rotateTo(nextFace, () => {
      setActiveFace(nextFace);
      setDescVisible(true);

      if (nextFace === 5) {
        passThroughRef.current = true;
        wheelAccumRef.current = 0;
      }
      if (nextFace === 0 && direction === 'backward') {
        topPassThroughRef.current = true;
        setTimeout(() => {
          globalActiveRef.current = false;
          snappedCenterRef.current = null;
          unlockScroll();
          hasExitedBackRef.current = true;
        }, 250);
      }

      setTimeout(() => { hasRotatedRef.current = false; }, 320);
    });
  }, [rotateTo, unlockScroll]);

  // ── Main effect: attach wheel + scroll listeners ──────────────────────────
  useEffect(() => {
    if (!cubeMode) return; // listeners only active in cube mode

    const cube = cubeRef.current;
    const wrapper = wrapperRef.current;
    if (!cube || !wrapper) return;

    // Set initial face geometry
    const computeSize = () => Math.min(window.innerWidth * 0.38, 380);
    let cubeSize = computeSize();

    const updateFacePositions = () => {
      cubeSize = computeSize();
      cube.style.setProperty('--cube-size', `${cubeSize}px`);
      const transforms = faceTransforms(cubeSize);
      Array.from(cube.children).forEach((face, i) => {
        face.style.transform = transforms[i];
      });
    };
    updateFacePositions();

    // Keyboard handler
    const preventScrollKeys = (e) => {
      if (!globalActiveRef.current) return;
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Spacebar'];
      if (keys.includes(e.key)) e.preventDefault();
    };

    // Wheel handler
    const handleWheel = (e) => {
      if (!globalActiveRef.current) return;
      if (!wrapper) return;

      // Absorb momentum spike right after snap
      if (ignoreFirstWheelRef.current) {
        ignoreFirstWheelRef.current = false;
        wheelAccumRef.current = 0;
        e.preventDefault();
        return;
      }

      const now = Date.now();
      if (now - lastWheelTimeRef.current > 300) wheelAccumRef.current = 0;
      lastWheelTimeRef.current = now;
      wheelAccumRef.current += e.deltaY;

      // Keep page pinned at snapped position
      if (snappedCenterRef.current !== null) {
        const drift = Math.abs(window.scrollY - snappedCenterRef.current);
        if (drift > 2) window.scrollTo({ top: snappedCenterRef.current });
      }

      e.preventDefault();

      const ABS_THRESHOLD     = 30;
      const RELEASE_THRESHOLD = 80;
      const direction = wheelAccumRef.current > 0 ? 'forward' : 'backward';

      if (Math.abs(wheelAccumRef.current) < ABS_THRESHOLD) return;

      // Final face: strong forward gesture to release
      if (currentFaceRef.current === 5) {
        if (direction === 'forward') {
          if (passThroughRef.current && Math.abs(wheelAccumRef.current) > RELEASE_THRESHOLD) {
            globalActiveRef.current = false;
            snappedCenterRef.current = null;
            unlockScroll();
            hasCompletedRef.current = true;
            wheelAccumRef.current = 0;
          }
          return;
        }
        rotateCube('backward');
        wheelAccumRef.current = 0;
        return;
      }

      rotateCube(direction);
      wheelAccumRef.current = 0;
    };

    // Scroll handler: detect when cube centre reaches viewport centre
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastScrollYRef.current;
      lastScrollYRef.current = currentY;

      if (!wrapper || globalActiveRef.current) return;

      const rect = wrapper.getBoundingClientRect();
      const vh   = window.innerHeight;
      const cubeCenterY    = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const dist = Math.abs(cubeCenterY - viewportCenter);
      const ACTIVATION_THRESHOLD = 50;

      // Re-arm after full cycle
      if (hasCompletedRef.current) {
        if (rect.bottom < 0 || rect.top > vh) {
          hasCompletedRef.current = false;
          currentFaceRef.current = scrollingUp && rect.bottom < 0 ? 5 : 0;
          passThroughRef.current = false;
          topPassThroughRef.current = false;
          rotateTo(currentFaceRef.current, () => setActiveFace(currentFaceRef.current));
        } else { return; }
      }

      // Re-arm after backward exit
      if (hasExitedBackRef.current) {
        if (rect.bottom < 0 || rect.top > vh) hasExitedBackRef.current = false;
        else return;
      }

      if (dist <= ACTIVATION_THRESHOLD) {
        // Snap page so cube is exactly centred
        const targetScroll = window.scrollY + (rect.top - (viewportCenter - rect.height / 2));
        if (Math.abs(window.scrollY - targetScroll) > 1) window.scrollTo({ top: targetScroll });
        snappedCenterRef.current = Math.round(targetScroll);
        globalActiveRef.current  = true;
        wheelAccumRef.current    = 0;
        lastWheelTimeRef.current = Date.now();

        // If entering from below, start at last face
        if (scrollingUp && !hasCompletedRef.current && currentFaceRef.current === 0) {
          currentFaceRef.current = 5;
          rotateTo(5, () => setActiveFace(5));
        }

        // Ignore first wheel event to absorb scroll momentum
        ignoreFirstWheelRef.current = true;
        if (ignoreTimerRef.current) window.clearTimeout(ignoreTimerRef.current);
        ignoreTimerRef.current = window.setTimeout(() => {
          ignoreFirstWheelRef.current = false;
        }, 350);

        lockScroll();
      }

      // Safety release
      if (!globalActiveRef.current && document.body.style.overflow === 'hidden') unlockScroll();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', preventScrollKeys, { passive: false });
    window.addEventListener('resize', updateFacePositions);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', preventScrollKeys);
      window.removeEventListener('resize', updateFacePositions);
      if (ignoreTimerRef.current) window.clearTimeout(ignoreTimerRef.current);
      unlockScroll();
      globalActiveRef.current = false;
    };
  }, [cubeMode, rotateCube, rotateTo, lockScroll, unlockScroll]);

  // ── Reset state when toggling mode ───────────────────────────────────────
  const handleToggle = () => {
    // Always release scroll lock before toggling
    globalActiveRef.current = false;
    snappedCenterRef.current = null;
    unlockScroll();
    hasCompletedRef.current = false;
    hasExitedBackRef.current = false;
    passThroughRef.current = false;
    topPassThroughRef.current = false;
    currentFaceRef.current = 0;
    wheelAccumRef.current = 0;
    setActiveFace(0);
    setDescVisible(true);
    if (cubeRef.current) {
      gsap.set(cubeRef.current, { rotationX: 0, rotationY: 0 });
    }
    setCubeMode(prev => !prev);
  };

  // ── Skip section: smooth scroll to experience ────────────────────────────
  const handleSkip = () => {
    globalActiveRef.current = false;
    snappedCenterRef.current = null;
    unlockScroll();
    const next = document.getElementById('experience');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  };

  // ── Active project data ───────────────────────────────────────────────────
  const activeProject = faces[activeFace];
  const isEmpty       = activeProject?.id === 'empty';

  return (
    <section id="projects" ref={sectionRef}>
      <div className="container">
        {/* Section header */}
        <div className="section-header">
          <span className="section-label">
            <ExternalLink size={14} /> Selected Works
          </span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-desc">Showcasing engineering excellence and scalable architecture.</p>
        </div>

        {/* Toggle button */}
        <div className="cube-toggle-row">
          <button
            className={`cube-toggle-btn${cubeMode ? ' active' : ''}`}
            onClick={handleToggle}
            title={cubeMode ? 'Switch to skip mode' : 'Switch to cube mode'}
          >
            {cubeMode
              ? <><Zap size={15} /> Cube Mode — scroll to explore</>
              : <><ZapOff size={15} /> Skip Mode — cube disabled</>}
          </button>
          {cubeMode && (
            <button className="cube-skip-btn" onClick={handleSkip}>
              Skip section <ChevronDown size={15} />
            </button>
          )}
        </div>

        {/* Main layout: desc left | cube right */}
        <div className="cube-layout" ref={wrapperRef}>

          {/* ── Left panel: project description ── */}
          <div className="cube-desc-panel">
            <AnimatePresence mode="wait">
              {!isEmpty ? (
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: descVisible ? 1 : 0, x: descVisible ? 0 : -12 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="cube-desc-card glass-card"
                >
                  {/* Face indicator */}
                  <div className="cube-face-indicator">
                    {faces.map((_, i) => (
                      <span
                        key={i}
                        className={`cube-face-dot${i === activeFace ? ' active' : ''}${faces[i].id === 'empty' ? ' empty' : ''}`}
                      />
                    ))}
                  </div>

                  <span className="cube-desc-category">{activeProject.category}</span>
                  <h3 className="cube-desc-title">{activeProject.title}</h3>
                  <p className="cube-desc-body">{activeProject.desc}</p>

                  <div className="cube-desc-stack">
                    {activeProject.stack.map(s => (
                      <span key={s} className="skill-tag">{s}</span>
                    ))}
                  </div>

                  {activeProject.link && activeProject.link !== '#' && (
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary cube-desc-cta"
                    >
                      <ExternalLink size={14} /> View Project
                    </a>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty-slot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="cube-desc-card glass-card cube-empty-slot"
                >
                  <div className="cube-face-indicator">
                    {faces.map((_, i) => (
                      <span
                        key={i}
                        className={`cube-face-dot${i === activeFace ? ' active' : ''}${faces[i].id === 'empty' ? ' empty' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="cube-empty-label">Coming Soon</span>
                  <p className="cube-desc-body" style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    This face is reserved for a future project. Check back soon!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scroll hint (cube mode only) */}
            {cubeMode && (
              <motion.p
                className="cube-scroll-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {activeFace < 5
                  ? `Face ${activeFace + 1} / 6 — scroll down to rotate`
                  : 'All faces seen — scroll down to continue'}
              </motion.p>
            )}
          </div>

          {/* ── Right panel: 3D cube ── */}
          <div className="cube-scene-panel">
            <div className="cube-perspective-wrapper">
              <div
                ref={cubeRef}
                className="cube-3d"
                style={{ '--cube-size': '340px' }}
              >
                {faces.map((face, i) => (
                  <div
                    key={face.id}
                    className={`cube-face${i === activeFace ? ' cube-face--active' : ''}${face.id === 'empty' ? ' cube-face--empty' : ''}`}
                    style={{ '--face-accent': face.color || 'var(--accent)' }}
                  >
                    {face.image ? (
                      <>
                        <img
                          src={face.image}
                          alt={face.title}
                          className="cube-face-img"
                          loading="lazy"
                        />
                        <div className="cube-face-overlay" />
                        <div className="cube-face-label">
                          <span className="cube-face-label-title">{face.title}</span>
                          <span className="cube-face-label-cat">{face.category}</span>
                        </div>
                      </>
                    ) : (
                      <div className="cube-face-empty-inner">
                        <span className="cube-face-empty-icon">+</span>
                        <span className="cube-face-empty-text">Coming Soon</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Ambient glow beneath cube */}
              <div className="cube-glow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
