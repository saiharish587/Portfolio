import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import TiltedCard from './TiltedCard';
import profileImage from '../assets/Sai_Harish.jpeg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity }
  }
};

export const Hero = () => {
  const { hero } = portfolioData;

  return (
    <section id="hero">
      <div className="container">
        <div className="hero-grid">
          <motion.div
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div className="hero-badge" variants={badgeVariants}>
              <motion.span animate="pulse" style={{ width: '6px', height: '6px' }} />
              {hero.badge}
            </motion.div>

            {/* Name */}
            <motion.h1 className="hero-name" variants={itemVariants}>
              {hero.name}<br />
              <span className="highlight">{hero.surname}</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p className="hero-tagline" variants={itemVariants}>
              {hero.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="hero-actions" variants={itemVariants}>
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(16,185,129,0.35)' }}
                whileTap={{ scale: 0.95 }}
              >
                {hero.cta1}
              </motion.a>
              <motion.a
                href={`mailto:${hero.email}`}
                className="btn-secondary"
                whileHover={{ y: -2, backgroundColor: 'var(--surface)' }}
                whileTap={{ scale: 0.95 }}
              >
                {hero.cta2}
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div className="hero-socials" variants={itemVariants}>
              {[
                { icon: 'GitHub', url: 'https://github.com/saiharish587' },
                { icon: 'LinkedIn', url: 'https://linkedin.com' },
                { icon: 'Email', url: `mailto:${hero.email}` }
              ].map((social, i) => (
                <motion.a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ 
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border-2)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {social.icon.slice(0, 2).toUpperCase()}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side visual */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <TiltedCard
              imageSrc={profileImage}
              altText="Sai Harish"
              captionText="Full Stack Developer"
              containerHeight="clamp(240px, 30vw, 320px)"
              containerWidth="clamp(240px, 30vw, 320px)"
              imageHeight="clamp(240px, 30vw, 320px)"
              imageWidth="clamp(240px, 30vw, 320px)"
              rotateAmplitude={12}
              scaleOnHover={1.15}
              showMobileWarning={false}
              showTooltip={true}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
