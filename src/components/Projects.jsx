import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Monitor, Bot, LineChart, AudioWaveform, ArrowRight, ExternalLink } from 'lucide-react';

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

const IconMap = {
  Monitor: <Monitor size={24} />,
  Bot: <Bot size={24} />,
  LineChart: <LineChart size={24} />,
  AudioWaveform: <AudioWaveform size={24} />
};

export const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label"><ExternalLink size={14} /> Selected Works</span>
          <h2 className="section-title">Featured<br/>Projects</h2>
          <p className="section-desc">Showcasing engineering excellence and scalable architecture.</p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card glass-card ${project.tag === 'FEATURED' ? 'featured' : ''}`}
              variants={itemVariants}
            >
              {project.tag === 'FEATURED' && (
                <div style={{ position: 'absolute', top: '2rem', right: '2rem' }}>
                  <span className="section-label" style={{ margin: 0, fontSize: '0.65rem' }}>{project.tag}</span>
                </div>
              )}
              
              <div className="project-content">
                <div className="project-icon">
                  {IconMap[project.icon] || <Monitor size={24} />}
                </div>
                <h3 className="project-title" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>{project.title}</h3>
                <p className="project-desc" style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>{project.desc}</p>
                
                <div className="project-stack">
                  {project.stack.map(tech => (
                    <span key={tech} className="stack-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: project.tag === 'FEATURED' ? '0' : '2rem' }}>
                <div className="btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
                  View Project <ArrowRight size={16} />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
