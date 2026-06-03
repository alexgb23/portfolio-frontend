import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import ProjectCard from '../cards/ProjectCard'
import "./sectionsGlobals.css";

function FeaturedProjects({ projects = [] }) {
  return (
    <section className="section section-spaced section-separated" id="proyectos">
      <div className="section-head-centered">
        <span className="section-kicker">Portfolio</span>
        <h2>Proyectos destacados</h2>
        <p>
          Aplicaciones, integraciones y herramientas técnicas orientadas a
          resultados reales.
        </p>
      </div>

      <div className="grid-cards">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="empty-inline-state">
            <p>Aún no hay proyectos destacados cargados.</p>
          </div>
        )}
      </div>

      <div className="section-more">
        <Link to="/proyectos" className="inline-link">
          Ver todos los proyectos <FaArrowRight />
        </Link>
      </div>
    </section>
  )
}

export default FeaturedProjects