import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects">
      <div className="container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Latest Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-desc">Showcasing my best work in web development and AI</p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card ${project.tag === 'FEATURED' ? 'featured' : ''}`}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {project.tag === 'FEATURED' && (
                <motion.span className="project-tag" layoutId="featured-tag">
                  {project.tag}
                </motion.span>
              )}
              
              <div className="project-icon">{project.icon}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>
              
              <div className="project-stack">
                {project.stack.map(tech => (
                  <motion.span key={tech} className="stack-tag">
                    {tech}
                  </motion.span>
                ))}
              </div>
              
              <motion.div
                className="project-link"
                whileHover={{ x: 5 }}
              >
                View Project →
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
