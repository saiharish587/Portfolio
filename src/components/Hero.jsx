import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { portfolioData } from '../data/portfolioData';
import resumePDF from '../assets/23211a6794-Puchala_Sai_Harish.pdf';
import profileImage from '../assets/Sai_Harish.jpeg';

const StarField = (props) => {
  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#8b5cf6" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
};

export const Hero = () => {
  const { hero } = portfolioData;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.8 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }
    }
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  return (
    <section id="hero">
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <StarField />
        </Canvas>
      </div>
      
      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="section-label">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-glow)', display: 'inline-block', boxShadow: '0 0 10px var(--accent-glow)' }}></span>
            {hero.badge}
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero-name">
            {hero.name} <br />
            <span className="text-accent-gradient">{hero.surname}</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-tagline">
            {hero.tagline}
          </motion.p>

          <motion.div variants={itemVariants} className="hero-actions">
            <a href="#projects" className="btn-primary">
              {hero.cta1}
            </a>
            <a href={resumePDF} download="Sai_Harish_Puchala_Resume.pdf" className="btn-secondary">
              {hero.cta2}
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-image-container"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
          ref={imageRef}
          style={{
            '--mouse-x': `${mousePosition.x * 100}%`,
            '--mouse-y': `${mousePosition.y * 100}%`
          }}
        >
          <div className="image-wrapper">
            <img src={profileImage} alt="Sai Harish Puchala" className="profile-image" />
            <div className="image-glow" />
            <div className="image-border" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
