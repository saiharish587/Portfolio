import TiltedCard from './TiltedCard';
import { portfolioData } from '../data/portfolioData';
import { ExternalLink } from 'lucide-react';

export const Projects = () => {
  const { projects } = portfolioData;

  const projectCards = projects;

  return (
    <section id="projects">
      <div className="container">
        <div
          className="section-header"
        >
          <span className="section-label"><ExternalLink size={14} /> Selected Works</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-desc">Showcasing engineering excellence and scalable architecture.</p>
        </div>

        <div className="featured-projects-grid featured-projects-grid--all">
          {projectCards.map(project => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noreferrer noopener"
              className="featured-project-link glass-card"
            >
              <TiltedCard
                imageSrc={project.image}
                altText={`${project.title} project screenshot`}
                captionText={project.title}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                scaleOnHover={1.05}
                rotateAmplitude={10}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="featured-project-overlay">
                    <h3 className="featured-project-title">{project.title}</h3>
                    <p className="featured-project-desc">{project.category}</p>
                    <div className="featured-project-stack">
                      {project.stack.slice(0, 4).map(stackItem => (
                        <span key={stackItem}>{stackItem}</span>
                      ))}
                    </div>
                  </div>
                }
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
