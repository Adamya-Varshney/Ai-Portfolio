"use client";
import { Card, Carousel } from "@/components/projects/apple-cards-carousel";
import { data } from "@/components/projects/ConfigData";

export default function AllProjects() {
  const productProjects = data.filter(d => d.section === 'Product & Tech Projects');
  const strategyProjects = data.filter(d => d.section === 'Business Strategy & GTM Projects');

  const productCards = productProjects.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  const strategyCards = strategyProjects.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full h-full pt-8 space-y-10">
      <div>
        <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          My Projects
        </h2>
        <Carousel items={productCards} />
      </div>

      <div>
        <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans px-4 md:px-0">
          Business Strategy & GTM Projects
        </h2>
        <Carousel items={strategyCards} />
      </div>
    </div>
  );
}
