import { useLaboratoryHome } from "../../hooks/usePortfolioData";
import LaboratoryHero from "./components/LaboratoryHero";
import LaboratorySection from "./components/LaboratorySection";
import LaboratoryFooter from "./components/LaboratoryFooter";

export default function Laboratory() {
  const { featuredItems, stats, topTechnologies, loading, error } =
    useLaboratoryHome(true);
console.log("featuredItems:", featuredItems);
console.log("stats desde hook:", stats);
console.log("documents_count:", stats?.documents_count);
  return (
    <>
      <LaboratoryHero />
      <LaboratorySection
        featuredItems={featuredItems}
        statsData={stats}
        topTechnologies={topTechnologies}
        loading={loading}
        error={error}
      />
      <LaboratoryFooter />
    </>
  );
}
