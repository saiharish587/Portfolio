import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// ─── Cube face CSS transforms ────────────────────────────────────────────────
const faceTransforms = (size) => [
  `translateZ(${size / 2}px)`,
  `rotateY( 90deg) translateZ(${size / 2}px)`,
  `rotateY(180deg) translateZ(${size / 2}px)`,
  `rotateY(-90deg) translateZ(${size / 2}px)`,
  `rotateX( 90deg) translateZ(${size / 2}px)`,
  `rotateX(-90deg) translateZ(${size / 2}px)`,
];

// ─── Dice-tumble rotation sequence ───────────────────────────────────────────
// Note on CSS 3D coordinates: +X right, +Y down, +Z towards viewer.
// faceTransforms[4] (AI-Article-Processor) is rotateX(90deg) -> top (-Y), so cube needs rotationX: -90 to face front.
// faceTransforms[5] (Empty / Coming Soon) is rotateX(-90deg) -> bottom (+Y), so cube needs rotationX: 90 to face front.
const ROTATION_SEQUENCE = [
  { rotationX:   0, rotationY:    0 },   // 0: front
  { rotationX:   0, rotationY:  -90 },   // 1: right
  { rotationX:   0, rotationY: -180 },   // 2: back
  { rotationX:   0, rotationY: -270 },   // 3: left
  { rotationX: -90, rotationY: -360 },   // 4: top (AI-Article-Processor)
  { rotationX:  90, rotationY: -360 },   // 5: bottom (Coming Soon)
];

const TOTAL_FACES      = 6;
const SCROLL_PER_FACE  = 1.0; // viewport-heights of scroll per face

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
  out.push({ id: 'empty', title: '', desc: '', category: '', stack: [], link: '#', image: null, color: '#1c1c1c' });
  return out;
};

// ─── iOS-style toggle switch ──────────────────────────────────────────────────
const ToggleSwitch = ({ on, onToggle }) => (
  <div className="cube-toggle-switch" onClick={onToggle} role="switch" aria-checked={on} tabIndex={0}
    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onToggle()}>
    <span className="cube-toggle-switch__label">{on ? 'Cube On' : 'Cube Off'}</span>
    <div className={`cube-toggle-switch__track${on ? ' on' : ''}`}>
      <div className="cube-toggle-switch__thumb" />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
export const ProjectsCube = () => {
  const { projects } = portfolioData;
  const faces = buildFaces(projects);

  const outerRef       = useRef(null);
  const cubeRef        = useRef(null);
  const stRef          = useRef(null);
  const currentFaceRef = useRef(-1);
  const descTimerRef   = useRef(null);

  const [activeFace,  setActiveFace]  = useState(0);
  const [cubeMode,    setCubeMode]    = useState(true);
  const [descVisible, setDescVisible] = useState(true);

  // ── Face geometry ────────────────────────────────────────────────────────
  const updateFaceGeometry = useCallback(() => {
    if (!cubeRef.current) return;
    // cube takes ~40% of viewport width, capped at 360px
    const size = Math.min(window.innerWidth * 0.40, 360);
    cubeRef.current.style.setProperty('--cube-size', `${size}px`);
    faceTransforms(size).forEach((t, i) => {
      const face = cubeRef.current.children[i];
      if (face) face.style.transform = t;
    });
  }, []);

  // ── Cube rotation ────────────────────────────────────────────────────────
  const rotateTo = useCallback((idx) => {
    if (!cubeRef.current) return;
    const t = ROTATION_SEQUENCE[idx];
    gsap.to(cubeRef.current, {
      rotationX: t.rotationX,
      rotationY: t.rotationY,
      duration: 0.65,
      ease: 'power2.inOut',
      overwrite: 'auto',
    });
  }, []);

  // ── ScrollTrigger setup ──────────────────────────────────────────────────
  useEffect(() => {
    if (stRef.current) { stRef.current.kill(); stRef.current = null; }
    if (!cubeMode || !outerRef.current || !cubeRef.current) return;

    updateFaceGeometry();

    const totalExtra = window.innerHeight * SCROLL_PER_FACE * TOTAL_FACES;

    stRef.current = ScrollTrigger.create({
      trigger:       outerRef.current,
      start:         'top top',
      end:           `+=${totalExtra}`,
      pin:           true,
      pinSpacing:    true,
      anticipatePin: 1,
      onUpdate(self) {
        const step = Math.min(TOTAL_FACES - 1, Math.floor(self.progress * TOTAL_FACES));
        if (step === currentFaceRef.current) return;
        currentFaceRef.current = step;
        if (descTimerRef.current) clearTimeout(descTimerRef.current);
        setDescVisible(false);
        rotateTo(step);
        descTimerRef.current = setTimeout(() => {
          setActiveFace(step);
          setDescVisible(true);
        }, 320);
      },
    });

    window.addEventListener('resize', updateFaceGeometry);
    return () => {
      if (descTimerRef.current) clearTimeout(descTimerRef.current);
      stRef.current?.kill(); stRef.current = null;
      window.removeEventListener('resize', updateFaceGeometry);
    };
  }, [cubeMode, updateFaceGeometry, rotateTo]);

  // ── Toggle ───────────────────────────────────────────────────────────────
  const handleToggle = () => {
    if (descTimerRef.current) clearTimeout(descTimerRef.current);
    stRef.current?.kill(); stRef.current = null;
    currentFaceRef.current = -1;
    setActiveFace(0);
    setDescVisible(true);
    if (cubeRef.current) gsap.set(cubeRef.current, { rotationX: 0, rotationY: 0 });
    setCubeMode(prev => !prev);
    setTimeout(() => ScrollTrigger.refresh(), 120);
  };

  const handleSkip = () =>
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });

  const activeProject = faces[activeFace];
  const isEmpty       = activeProject?.id === 'empty';

  return (
    <section id="projects">
      <div ref={outerRef} className="cube-outer">
        <div className="container cube-container">

          {/* ── Compact top bar ── */}
          <div className="cube-topbar">
            <div className="cube-topbar__left">
              <span className="section-label" style={{ marginBottom: 0 }}>
                <ExternalLink size={13} /> Selected Works
              </span>
              <h2 className="cube-section-title">Featured Projects</h2>
            </div>
            <div className="cube-topbar__right">
              <ToggleSwitch on={cubeMode} onToggle={handleToggle} />
              {cubeMode && (
                <button className="cube-skip-btn" onClick={handleSkip}>
                  Skip <ChevronDown size={13} />
                </button>
              )}
            </div>
          </div>

          {/* ── Main layout ── */}
          <div className="cube-layout">

            {/* Left: description */}
            <div className="cube-desc-panel">
              <AnimatePresence mode="wait">
                {!isEmpty ? (
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: descVisible ? 1 : 0, x: descVisible ? 0 : -10 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="cube-desc-card glass-card"
                  >
                    {/* Progress dots */}
                    <div className="cube-face-indicator">
                      {faces.map((f, i) => (
                        <span key={i}
                          className={['cube-face-dot', i === activeFace ? 'active' : '', f.id === 'empty' ? 'empty' : ''].join(' ')} />
                      ))}
                    </div>

                    <span className="cube-desc-category">{activeProject.category}</span>
                    <h3 className="cube-desc-title">{activeProject.title}</h3>
                    <p className="cube-desc-body">{activeProject.desc}</p>

                    <div className="cube-desc-stack">
                      {activeProject.stack.map(s => <span key={s} className="skill-tag">{s}</span>)}
                    </div>

                    {activeProject.link && activeProject.link !== '#' && (
                      <a href={activeProject.link} target="_blank" rel="noopener noreferrer"
                        className="btn-primary cube-desc-cta">
                        <ExternalLink size={13} /> View Project
                      </a>
                    )}
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="cube-desc-card glass-card cube-empty-slot">
                    <div className="cube-face-indicator">
                      {faces.map((f, i) => (
                        <span key={i}
                          className={['cube-face-dot', i === activeFace ? 'active' : '', f.id === 'empty' ? 'empty' : ''].join(' ')} />
                      ))}
                    </div>
                    <span className="cube-empty-label">Coming Soon</span>
                    <p className="cube-desc-body" style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                      This face is reserved for a future project.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {cubeMode && (
                <p className="cube-scroll-hint">
                  {activeFace < 5
                    ? `${activeFace + 1} / 6 — scroll to rotate`
                    : 'All faces seen — scroll to continue ↓'}
                </p>
              )}
            </div>

            {/* Right: 3-D cube */}
            <div className="cube-scene-panel">
              <div className="cube-perspective-wrapper">
                <div ref={cubeRef} className="cube-3d" style={{ '--cube-size': '340px' }}>
                  {faces.map((face, i) => (
                    <div key={face.id}
                      className={['cube-face', i === activeFace ? 'cube-face--active' : '', face.id === 'empty' ? 'cube-face--empty' : ''].join(' ')}
                      style={{ '--face-accent': face.color || 'var(--accent)' }}>
                      {face.image ? (
                        <>
                          <img src={face.image} alt={face.title} className="cube-face-img" loading="eager" />
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
                <div className="cube-glow" />
              </div>
            </div>

          </div>{/* .cube-layout */}
        </div>{/* .cube-container */}
      </div>{/* .cube-outer */}
    </section>
  );
};
