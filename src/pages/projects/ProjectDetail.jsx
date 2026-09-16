import { useOutletContext, useParams } from "react-router";

import { useProjectDetail } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";
import ProjectDetailView from "./project-details-components/ProjectDetailView";

function ProjectDetail() {
  const { slug } = useParams();
  const { openCvModal } = useOutletContext();

  const { project, loading, error, isRefreshing, isRetrying } =
    useProjectDetail(slug);

  usePageTitle(project?.title || "Detalle del Proyecto | Alexander Galvez");

  return (
    <ProjectDetailView
      slug={slug}
      loading={loading}
      isRefreshing={isRefreshing}
      isRetrying={isRetrying}
      error={error}
      project={project}
      onOpenCv={openCvModal}
    />
  );
}

export default ProjectDetail;
