import "./ProjectDetailBody.css";

function ProjectDetailBody({ project, isRefreshing }) {
  return (
    <main className="project-detail__body">
      <p>BODY</p>
      <p>{project?.short_description || project?.description}</p>
      {isRefreshing ? <p>Refreshing...</p> : null}
    </main>
  );
}

export default ProjectDetailBody;
