import { BenefitsSection } from "./components/BenefitsSection";
import { BrandsSection } from "./components/BrandsSection";
import { CategoriesSection } from "./components/CategoriesSection";
import { Footer } from "./components/Footer";
import { GuaranteeSection } from "./components/GuaranteeSection";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LeadSection } from "./components/LeadSection";
import { PricesSection } from "./components/PricesSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { StepsSection } from "./components/StepsSection";
import {
  brands,
  categories,
  guaranteePoints,
  heroBenefits,
  prices,
  reviews,
  steps,
  whyUs,
} from "./data/content";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-6">
        <HeroSection categories={categories} heroBenefits={heroBenefits} />

        <CategoriesSection categories={categories} />

        <BenefitsSection items={whyUs} />

        <StepsSection steps={steps} />

        <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <ReviewsSection reviews={reviews} />
          <PricesSection prices={prices} />
        </section>

        <GuaranteeSection points={guaranteePoints} />

        <BrandsSection brands={brands} />

        <LeadSection />
      </main>

      <Footer />
    </div>
  );
}
