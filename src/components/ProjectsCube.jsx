import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ChevronDown, Zap, ZapOff } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// ─── Cube face CSS transforms for a given size ───────────────────────────────
const faceTransforms = (size) => [
  `translateZ(${size / 2}px)`,                        // 0  front
  `rotateY( 90deg) translateZ(${size / 2}px)`,        // 1  right
  `rotateY(180deg) translateZ(${size / 2}px)`,        // 2  back
  `rotateY(-90deg) translateZ(${size / 2}px)`,        // 3  left
  `rotateX( 90deg) translateZ(${size / 2}px)`,        // 4  top
  `rotateX(-90deg) translateZ(${size / 2}px)`,        // 5  bottom
];

// ─── Rotation targets — smooth dice-tumble sequence ──────────────────────────
const ROTATION_SEQUENCE = [
  { rotationX:   0, rotationY:    0 },   // face 0  front
  { rotationX:   0, rotationY:  -90 },   // face 1  right
  { rotationX:   0, rotationY: -180 },   // face 2  back
  { rotationX:   0, rotationY: -270 },   // face 3  left
  { rotationX:  90, rotationY:    0 },   // face 4  top
  { rotationX: -90, rotationY:    0 },   // face 5  bottom (empty)
];

const TOTAL_FACES = 6;
// How many viewport-heights of scroll space each face gets
const SCROLL_PER_FACE = 1.0;

// ─── Build padded face array (5 projects + 1 empty) ──────────────────────────
const buildFaces = (projects) => {
  const out = projects.slice(0, 5).map((p, i) => ({
    id: `proj-${i}`,
    title:    p.title,
    desc:     p.desc,
    category: p.category,
    stack:    p.stack,
    link:     p.link,
    image:    p.image,
    color:    p.color,
  }));
  out.push({
    id: 'empty', title: '', desc: '', category: '',
    stack: [], link: '#', image: null, color: '#1c1c1c',
  });
  return out;
};

// ─────────────────────────────────────────────────────────────────────────────
export const ProjectsCube = () => {
  const { projects } = portfolioData;
  const faces = buildFaces(projects);

  // DOM refs
  const outerRef  = useRef(null);   // the pinned section wrapper
  const cubeRef   = useRef(null);   // the 3-D cube element
  const stRef     = useRef(null);   // ScrollTrigger instance

  // face tracking ref (no re-render required)
  const currentFaceRef = useRef(-1);

  // React state
  const [activeFace,   setActiveFace]   = useState(0);
  const [cubeMode,     setCubeMode]     = useState(true);
  const [descVisible,  setDescVisible]  = useState(true);

  // ── Update cube face geometry on resize ────────────────────────────────────
  const updateFaceGeometry = useCallback(() => {
    if (!cubeRef.current) return;
    const size = Math.min(window.innerWidth * 0.38, 380);
    cubeRef.current.style.setProperty('--cube-size', `${size}px`);
    const transforms = faceTransforms(size);
    Array.from(cubeRef.current.children).forEach((face, i) => {
      face.style.transform = transforms[i];
    });
  }, []);

  // ── Animate cube to a rotation target ──────────────────────────────────────
  const rotateTo = useCallback((faceIdx) => {
    if (!cubeRef.current) return;
    const t = ROTATION_SEQUENCE[faceIdx];
    gsap.to(cubeRef.current, {
      rotationX: t.rotationX,
      rotationY: t.rotationY,
      duration: 0.65,
      ease: 'power2.inOut',
      overwrite: 'auto',
    });
  }, []);

  // ── Wire up (or tear down) GSAP ScrollTrigger ──────────────────────────────
  useEffect(() => {
    // Always kill previous instance first
    if (stRef.current) {
      stRef.current.kill();
      stRef.current = null;
    }

    if (!cubeMode || !outerRef.current || !cubeRef.current) return;

    updateFaceGeometry();

    // Total extra scroll distance for all 6 faces
    const totalExtra = window.innerHeight * SCROLL_PER_FACE * TOTAL_FACES;

    stRef.current = ScrollTrigger.create({
      trigger:       outerRef.current,
      start:         'top top',
      end:           `+=${totalExtra}`,
      pin:           true,       // ← pins the section while user scrolls through extra space
      pinSpacing:    true,       // ← adds real scroll space below section
      anticipatePin: 1,          // ← reduces lag / flicker on pin
      onUpdate(self) {
        // Map scroll progress (0→1) to face index (0→5)
        const raw  = self.progress * TOTAL_FACES;
        const step = Math.min(TOTAL_FACES - 1, Math.floor(raw));

        if (step === currentFaceRef.current) return;   // no change
        currentFaceRef.current = step;

        // Fade description out, rotate cube, fade description back in
        setDescVisible(false);
        rotateTo(step);
        setTimeout(() => {
          setActiveFace(step);
          setDescVisible(true);
        }, 320);
      },
    });

    window.addEventListener('resize', updateFaceGeometry);

    return () => {
      stRef.current?.kill();
      stRef.current = null;
      window.removeEventListener('resize', updateFaceGeometry);
    };
  }, [cubeMode, updateFaceGeometry, rotateTo]);

  // ── Toggle between cube mode and normal scroll ─────────────────────────────
  const handleToggle = () => {
    // Kill ScrollTrigger before toggling to avoid state clash
    if (stRef.current) {
      stRef.current.kill();
      stRef.current = null;
    }
    // Reset cube orientation
    currentFaceRef.current = -1;
    setActiveFace(0);
    setDescVisible(true);
    if (cubeRef.current) {
      gsap.set(cubeRef.current, { rotationX: 0, rotationY: 0 });
    }
    setCubeMode(prev => !prev);
    // Let ScrollTrigger recalculate after DOM settles
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  // ── Skip to next section ───────────────────────────────────────────────────
  const handleSkip = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeProject = faces[activeFace];
  const isEmpty       = activeProject?.id === 'empty';

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <section id="projects">
      {/*
        outerRef is what ScrollTrigger pins.
        In skip mode this is a normal div with no pinning.
      */}
      <div ref={outerRef} className="cube-outer">
        <div className="container">

          {/* Section header */}
          <div className="section-header" style={{ position: 'relative', zIndex: 2 }}>
            <span className="section-label">
              <ExternalLink size={14} /> Selected Works
            </span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-desc">
              Showcasing engineering excellence and scalable architecture.
            </p>
          </div>

          {/* Toggle + Skip row */}
          <div className="cube-toggle-row" style={{ position: 'relative', zIndex: 2 }}>
            <button
              className={`cube-toggle-btn${cubeMode ? ' active' : ''}`}
              onClick={handleToggle}
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

          {/* Two-column layout */}
          <div className="cube-layout">

            {/* ── Left: description panel ── */}
            <div className="cube-desc-panel">
              <AnimatePresence mode="wait">
                {!isEmpty ? (
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: descVisible ? 1 : 0, x: descVisible ? 0 : -12 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="cube-desc-card glass-card"
                  >
                    {/* Face-dot progress indicator */}
                    <div className="cube-face-indicator">
                      {faces.map((f, i) => (
                        <span
                          key={i}
                          className={[
                            'cube-face-dot',
                            i === activeFace ? 'active' : '',
                            f.id === 'empty' ? 'empty' : '',
                          ].join(' ')}
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
                      {faces.map((f, i) => (
                        <span
                          key={i}
                          className={[
                            'cube-face-dot',
                            i === activeFace ? 'active' : '',
                            f.id === 'empty' ? 'empty' : '',
                          ].join(' ')}
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

              {cubeMode && (
                <p className="cube-scroll-hint">
                  {activeFace < 5
                    ? `Face ${activeFace + 1} / 6 — keep scrolling to rotate`
                    : 'All faces seen — scroll down to continue ↓'}
                </p>
              )}
            </div>

            {/* ── Right: 3-D cube ── */}
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
                      className={[
                        'cube-face',
                        i === activeFace ? 'cube-face--active' : '',
                        face.id === 'empty' ? 'cube-face--empty' : '',
                      ].join(' ')}
                      style={{ '--face-accent': face.color || 'var(--accent)' }}
                    >
                      {face.image ? (
                        <>
                          <img
                            src={face.image}
                            alt={face.title}
                            className="cube-face-img"
                            loading="eager"
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

                {/* Ambient ground glow */}
                <div className="cube-glow" />
              </div>
            </div>

          </div>{/* .cube-layout */}
        </div>{/* .container */}
      </div>{/* .cube-outer */}
    </section>
  );
};
