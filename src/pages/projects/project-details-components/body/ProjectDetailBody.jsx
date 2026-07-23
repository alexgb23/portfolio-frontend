import BodyHead from "./BodyHead";
import ProjectOverview from "./ProjectOverview";
import styles from "./ProjectDetailBody.module.css";

function ProjectDetailBody({ project }) {
  if (!project) return null;

  return (
    <div className={styles.body}>
      <BodyHead project={project} />
      <ProjectOverview project={project} />
    </div>
  );
}

export default ProjectDetailBody;
