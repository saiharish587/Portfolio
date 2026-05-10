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

export const Skills = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">My Arsenal</span>
          <h2 className="section-title">Skills & Technologies</h2>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, i) => (
            <motion.div key={skill.category} className="skill-group" variants={itemVariants}>
              <h3 className="skill-group-title">{skill.category}</h3>
              <div className="skill-pills">
                {skill.items.map((item, idx) => (
                  <motion.span
                    key={item}
                    className="skill-pill"
                    whileHover={{ 
                      borderColor: 'var(--border-2)',
                      color: 'var(--text)'
                    }}
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
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Work History</span>
          <h2 className="section-title">Experience</h2>
        </motion.div>

        <motion.div
          className="exp-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -4 }}
        >
          <div className="exp-logo">{experience.company.charAt(0)}</div>
          <div>
            <h3 className="exp-company">{experience.company}</h3>
            <p className="exp-role">{experience.role}</p>
            <span className="exp-date">{experience.period}</span>
            <ul className="exp-bullets">
              {experience.bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {bullet}
                </motion.li>
              ))}
            </ul>
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
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Learning Path</span>
          <h2 className="section-title">Education & Certifications</h2>
        </motion.div>

        <motion.div
          className="edu-certs-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {education.map((item, i) => (
            <motion.div key={i} className="edu-card" variants={itemVariants}>
              {item.degree ? (
                <>
                  <h3>{item.school}</h3>
                  <p>{item.degree}</p>
                  <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.875rem)', color: 'var(--text-3)' }}>
                    {item.details}
                  </p>
                </>
              ) : (
                <>
                  <h3>{item.title}</h3>
                  <ul className="cert-list">
                    {item.certs.map((cert, idx) => (
                      <motion.li
                        key={idx}
                        className="cert-item"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <span className="cert-icon">✓</span>
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
