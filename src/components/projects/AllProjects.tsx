"use client";
import { Card, Carousel } from "@/components/projects/apple-cards-carousel";
import { data } from "@/components/projects/ConfigData";

export default function AllProjects() {
  const productProjects = data.filter(d => d.section === 'Product & Tech Projects');
  const strategyProjects = data.filter(d => d.section === 'Business Strategy & GTM Projects');

  const productCards = productProjects.map((card, index) => (
    <Card key={card.src || card.title} card={card} index={index} layout={true} />
  ));

  const strategyCards = strategyProjects.map((card, index) => (
    <Card key={card.src || card.title} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full h-full pt-8 space-y-10">
      <div>
        <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          My Projects
        </h2>
        <p className="max-w-7xl mx-auto text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-sans mt-1">
          Product Sense &amp; AI Applications
        </p>
        <Carousel items={productCards} />
      </div>

      <div>
        <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans px-4 md:px-0">
          Business Strategy &amp; GTM Projects
        </h2>
        <p className="max-w-7xl mx-auto text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-sans mt-1 px-4 md:px-0">
          GTM &amp; Growth Strategy
        </p>
        <Carousel items={strategyCards} />
      </div>
    </div>
  );
}
