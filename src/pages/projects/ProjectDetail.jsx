import { useParams } from "react-router";
import { useProjectDetail } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";
import ProjectDetailView from "./project-details-components/ProjectDetailView";
import "./ProjectDetail.css";

function ProjectDetail() {
  const { slug } = useParams();
  const { project, loading, error, isRefreshing } = useProjectDetail(slug);

  usePageTitle(
    `${project?.title || "Detalle del Proyecto"} | Alexander Galvez`,
  );

  return (
    <ProjectDetailView
      slug={slug}
      loading={loading}
      error={error}
      isRefreshing={isRefreshing}
      project={project}
    />
  );
}

export default ProjectDetail;
