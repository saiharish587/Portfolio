import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Layers, Terminal, Sparkles, Code2, Server, Layout } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export const Skills = () => {
  const { skills } = portfolioData;

  const getIcon = (category) => {
    if (category.includes('Frontend')) return <Layout size={24} className="text-accent-glow" />;
    if (category.includes('Backend')) return <Server size={24} className="text-accent-glow" />;
    return <Layers size={24} className="text-accent-glow" />;
  };

  return (
    <section id="skills">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
          <span className="section-label"><Sparkles size={14} /> Tech Stack</span>
          <h2 className="section-title">Capabilities & Technologies</h2>
        </motion.div>

        <motion.div className="about-bento" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          {skills.map((skill) => (
            <motion.div key={skill.category} className="bento-item glass-card" variants={itemVariants}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div className="project-icon" style={{ margin: 0, width: '40px', height: '40px' }}>{getIcon(skill.category)}</div>
                <h3 className="skill-category" style={{ margin: 0 }}>{skill.category}</h3>
              </div>
              <div className="skills-list">
                {skill.items.map((item, idx) => (
                  <motion.span key={item} className="skill-tag" initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.04 }}>{item}</motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
          <span className="section-label"><Terminal size={14} /> Career</span>
          <h2 className="section-title">Professional Experience</h2>
        </motion.div>

        <motion.div className="glass-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div className="exp-list">
            <div className="exp-item">
              <div className="exp-date">{experience.period}</div>
              <div className="exp-content">
                <h3>{experience.company}</h3>
                <h4>{experience.role}</h4>
                <ul className="exp-bullets">
                  {experience.bullets.map((bullet, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 + (i * 0.06) }}>{bullet}</motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Education = () => {
  const { education } = portfolioData;

  return (
    <section id="education">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
          <span className="section-label"><Code2 size={14} /> Background</span>
          <h2 className="section-title">Education & Certifications</h2>
        </motion.div>

        <motion.div className="about-bento edu-section" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <div className="edu-cert-grid">
            <div className="edu-column">
              <div className="edu-header">
                <h3>Education</h3>
              </div>
              <div className="timeline-wrapper">
                {(education || []).filter(e => e.school).map((item, idx) => (
                  <motion.div className="timeline-row" key={idx} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }}>
                    <div className="timeline-column">
                      <div className="timeline-dot" aria-hidden="true" />
                    </div>
                    <div className="content-column">
                      <div className="timeline-card glass-card">
                        <h4 className="timeline-school">{item.school}</h4>
                        <div className="timeline-degree">{item.degree}</div>
                        <div className="timeline-details">{item.details}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="cert-column">
              <div className="cert-header">
                <h3>Certifications</h3>
              </div>
              <div className="cert-grid">
                {(portfolioData.certificates || []).map((cert, cidx) => {
                  const initials = (cert.issuer || '').split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase() || 'CR';
                  return (
                    <motion.div className="cert-card glass-card" key={cert.id} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: cidx * 0.04 }}>
                      <div className="cert-icon">{initials}</div>
                      <div className="cert-body">
                        <div className="cert-title">{cert.title}</div>
                        <div className="cert-issuer">{cert.issuer}</div>
                      </div>
                      <a className="cert-btn" href={cert.link} target="_blank" rel="noreferrer">View</a>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
