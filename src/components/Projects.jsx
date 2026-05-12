import { ChromaGrid } from './ChromaGrid';
import { portfolioData } from '../data/portfolioData';
import { ExternalLink } from 'lucide-react';

export const Projects = () => {
  const { projects } = portfolioData;

  const chromaItems = projects.map(project => ({
    image: project.image,
    title: project.title,
    subtitle: project.category,
    url: project.link,
    borderColor: project.color,
    gradient: `linear-gradient(145deg, ${project.color}, #000)`
  }));

  return (
    <section id="projects">
      <div className="container">
        <div
          className="section-header"
        >
          <span className="section-label"><ExternalLink size={14} /> Selected Works</span>
          <h2 className="section-title">Featured<br/>Projects</h2>
          <p className="section-desc">Showcasing engineering excellence and scalable architecture.</p>
        </div>

        <div style={{ height: 'auto', position: 'relative' }}>
          <ChromaGrid 
            items={chromaItems}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
            columns={3}
            rows={2}
          />
        </div>
      </div>
    </section>
  );
};
