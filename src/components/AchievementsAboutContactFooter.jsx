import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Trophy, Star, Award, Code2, Cpu, Globe, User, MessageSquare, Mail } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17a5.2 5.2 0 0 0-1.5-3.8 4.9 4.9 0 0 0 .15-3.7s-1.2-.38-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.62 5 2 5 2a4.9 4.9 0 0 0 .15 3.7A5.2 5.2 0 0 0 3.6 9.5c0 5.77 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 9 19.74V22" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const MedalIconMap = {
  Trophy: <Trophy size={32} className="text-accent-glow" />,
  Star: <Star size={32} className="text-accent-glow" />,
  Award: <Award size={32} className="text-accent-glow" />
};

export const Achievements = () => {
  const { achievements } = portfolioData;

  return (
    <section id="achievements">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label"><Trophy size={14} /> Milestones</span>
          <h2 className="section-title">Notable<br/>Achievements</h2>
        </motion.div>

        <motion.div
          className="about-bento"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              className="bento-item glass-card"
              variants={itemVariants}
              style={{ textAlign: 'center', padding: '3rem 2rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {MedalIconMap[achievement.medal] || <Trophy size={32} />}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{achievement.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{achievement.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FactIconMap = {
  Code2: <Code2 size={24} />,
  Cpu: <Cpu size={24} />,
  Globe: <Globe size={24} />
};

export const About = () => {
  const { about } = portfolioData;

  return (
    <section id="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label"><User size={14} /> Identity</span>
          <h2 className="section-title">About<br/>Me</h2>
        </motion.div>

        <motion.div
          className="about-bento"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="bento-item large glass-card" variants={itemVariants}>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--text-primary)' }}>{about.text}</p>
          </motion.div>

          <motion.div className="bento-item glass-card" variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
            {about.facts.map((fact, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="project-icon" style={{ margin: 0, width: '48px', height: '48px' }}>
                  {FactIconMap[fact.icon] || <Code2 size={24} />}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{fact.label}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{fact.value}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const Contact = () => {
  const { contact } = portfolioData;

  return (
    <section id="contact">
      <div className="container">
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          style={{ padding: '5rem 3rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
        >
          <span className="section-label" style={{ marginBottom: '2rem' }}><MessageSquare size={14} /> Connect</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
            {contact.title}
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', marginInline: 'auto' }}>
            {contact.subtitle}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href={`mailto:${contact.email}`} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              <Mail size={20} /> Drop an Email
            </a>
          </div>

          <div className="social-links" style={{ marginTop: '4rem', marginBottom: '0' }}>
            <a href={contact.socials[0].url} className="social-icon" target="_blank" rel="noopener noreferrer">
              <GithubIcon />
            </a>
            <a href={contact.socials[1].url} className="social-icon" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ padding: '2rem 0', borderTop: '1px solid var(--glass-border)', textAlign: 'center', marginTop: '4rem' }}
    >
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        © {currentYear} Sai Harish Puchala. All rights reserved. • Building the future in Hyderabad, India.
      </p>
    </motion.footer>
  );
};
