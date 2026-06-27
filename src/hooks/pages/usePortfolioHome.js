import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

const initialValue = {
  profile: null,
  skills: [],
  projects: [],
  social_links: [],
  highlights: [],
  expertise: [],
};

export default function usePortfolioHome(enabled = true) {
  const { data, loading, error } = useAsyncResource(
    portfolioService.getHomeData,
    initialValue,
    [],
    "Home",
    enabled
  );

  return {
    homeData: data,
    profile: data?.profile ?? null,
    skills: Array.isArray(data?.skills) ? data.skills : [],
    projects: Array.isArray(data?.projects) ? data.projects : [],
    socialLinks: Array.isArray(data?.social_links) ? data.social_links : [],
    highlights: Array.isArray(data?.highlights) ? data.highlights : [],
    expertise: Array.isArray(data?.expertise) ? data.expertise : [],
    loading,
    error,
  };
}