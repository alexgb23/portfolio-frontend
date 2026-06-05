export default function ProjectCard({ project }) {
  if (!project) return null;

  // Convierte las tecnologías separadas por comas de tu BD en un array seguro
  const techList = project.technologies ? project.technologies.split(",") : [];
  // Formatea la fecha real de creación
  const displayDate = project.created_at
    ? project.created_at.split(" ")[0]
    : "2026";

  return (
    <article className="card card-project card-hover">
      <div className="card-top">
        <span className="card-badge">Software</span>
        <span className="date">{displayDate}</span>
      </div>
      <h3>{project.title ?? "Sin título"}</h3>
      <p>{project.description ?? "Sin descripción"}</p>
      <div className="tags">
        {techList.map((tech, i) => (
          <span key={i} className="tag">
            {tech.trim()}
          </span>
        ))}
      </div>
    </article>
  );
}
