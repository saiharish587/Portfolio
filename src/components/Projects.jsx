import TiltedCard from './TiltedCard';
import { portfolioData } from '../data/portfolioData';
import { ExternalLink } from 'lucide-react';
import { isValidUrl } from '../utils/securityUtils';

export const Projects = () => {
  const { projects } = portfolioData;

  const projectCards = projects;

  // SECURITY: Validate project links before rendering
  const handleProjectClick = (e, link) => {
    if (!isValidUrl(link)) {
      e.preventDefault();
      console.warn('Invalid project URL blocked:', link);
    }
  };

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
              onClick={(e) => handleProjectClick(e, project.link)}
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
