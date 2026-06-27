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

export default function usePortfolioHero() {
  const { data, loading, error } = useAsyncResource(
    portfolioService.getHeroData,
    initialValue,
    [],
    "Portfolio Hero",
  );

  return {
    profile: data?.profile ?? null,
    expertise: data?.expertise ?? [],
    socialLinks: data?.social_links ?? [],
    loading,
    error,
  };
}