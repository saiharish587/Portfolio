import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Layers, Terminal, Sparkles, Code2, Server, Layout } from 'lucide-react';

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
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label"><Sparkles size={14} /> Tech Stack</span>
          <h2 className="section-title">Capabilities &<br/>Technologies</h2>
        </motion.div>

        <motion.div
          className="about-bento"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skill, i) => (
            <motion.div key={skill.category} className="bento-item glass-card" variants={itemVariants}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="project-icon" style={{ margin: 0, width: '40px', height: '40px' }}>
                  {getIcon(skill.category)}
                </div>
                <h3 className="skill-category" style={{ margin: 0 }}>{skill.category}</h3>
              </div>
              <div className="skills-list">
                {skill.items.map((item, idx) => (
                  <motion.span
                    key={item}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {item}
                  </motion.span>
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
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label"><Terminal size={14} /> Career</span>
          <h2 className="section-title">Professional<br/>Experience</h2>
        </motion.div>

        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="exp-list">
            <div className="exp-item">
              <div className="exp-date">{experience.period}</div>
              <div className="exp-content">
                <h3>{experience.company}</h3>
                <h4>{experience.role}</h4>
                <ul className="exp-bullets">
                  {experience.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                    >
                      {bullet}
                    </motion.li>
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
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label"><Code2 size={14} /> Background</span>
          <h2 className="section-title">Education &<br/>Certifications</h2>
        </motion.div>

        <motion.div
          className="about-bento"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {education.map((item, i) => (
            <motion.div key={i} className="bento-item glass-card large" variants={itemVariants} style={item.degree ? { gridColumn: 'span 7' } : { gridColumn: 'span 5' }}>
              {item.degree ? (
                <>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.school}</h3>
                  <p style={{ color: 'var(--accent)', fontWeight: 500, marginBottom: '1rem' }}>{item.degree}</p>
                  <p className="exp-date">{item.details}</p>
                </>
              ) : (
                <>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.title}</h3>
                  <ul className="exp-bullets" style={{ gap: '0.75rem' }}>
                    {item.certs.map((cert, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        style={{ paddingLeft: '1.5rem' }}
                      >
                        {cert}
                      </motion.li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
