import BodyHead from "./BodyHead";
import styles from "./ProjectDetailBody.module.css";

function ProjectDetailBody({ project }) {
  if (!project) return null;

  return (
    <div className={styles.body}>
      <BodyHead project={project} />
    </div>
  );
}

export default ProjectDetailBody;
