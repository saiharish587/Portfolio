import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const Achievements = () => {
  const { achievements } = portfolioData;

  return (
    <section id="achievements">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Milestones</span>
          <h2 className="section-title">Achievements</h2>
        </motion.div>

        <motion.div
          className="ach-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              className="ach-card"
              variants={itemVariants}
              whileHover={{ y: -4, borderColor: 'var(--border-2)' }}
            >
              <motion.span
                className="ach-medal"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {achievement.medal}
              </motion.span>
              <h3 className="ach-title">{achievement.title}</h3>
              <p className="ach-sub">{achievement.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const About = () => {
  const { about } = portfolioData;

  return (
    <section id="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Get to Know Me</span>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <motion.div
          className="about-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Left: Text */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>{about.text}</p>
          </motion.div>

          {/* Right: Facts */}
          <motion.div
            className="about-card-stack"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {about.facts.map((fact, i) => (
              <motion.div
                key={i}
                className="about-fact"
                variants={itemVariants}
                whileHover={{ 
                  backgroundColor: 'var(--surface-2)',
                  scale: 1.02
                }}
              >
                <div className="fact-icon" style={{ 
                  background: i === 0 ? 'rgba(79,142,247,0.1)' : i === 1 ? 'rgba(45,212,191,0.1)' : 'rgba(123,92,240,0.1)',
                  color: i === 0 ? 'var(--accent)' : i === 1 ? 'var(--teal)' : 'var(--accent-2)'
                }}>
                  {fact.icon}
                </div>
                <div>
                  <div className="fact-label">{fact.label}</div>
                  <div className="fact-value">{fact.value}</div>
                </div>
              </motion.div>
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
          className="contact-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="contact-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {contact.title}
          </motion.h2>
          
          <motion.p
            className="contact-sub"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {contact.subtitle}
          </motion.p>

          <motion.div
            className="contact-links"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.a
              href={`mailto:${contact.email}`}
              className="contact-link primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              Send Email
            </motion.a>
            
            {contact.socials.slice(0, 2).map((social, i) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: (i + 1) * 0.1 } }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {social.name}
              </motion.a>
            ))}
          </motion.div>
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
    >
      <p>© {currentYear} Sai Harish Puchala. All rights reserved. • Hyderabad, India</p>
    </motion.footer>
  );
};
