import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

export default function usePortfolioHome() {
  const { data, loading, error } = useAsyncResource(
    portfolioService.getHomeData,
    {
      profile: null,
      skills: [],
      projects: [],
      social_links: [],
    },
    [],
    "Home"
  );

  return {
    homeData: data,
    profile: data?.profile ?? null,
    skills: Array.isArray(data?.skills) ? data.skills : [],
    projects: Array.isArray(data?.projects) ? data.projects : [],
    socialLinks: Array.isArray(data?.social_links) ? data.social_links : [],
    loading,
    error,
  };
}
