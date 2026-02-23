import { InfoCard } from "@/components/InfoCard";
import type { StatCard } from "@/type/management";

interface EntityStatsProps {
  cards: StatCard[];
}

export const EntityStats: React.FC<EntityStatsProps> = ({ cards }) => {
  if (!cards.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <InfoCard
          key={card.id}
          variant={card.variant}
          title={String(card.title)}
          description={card.description}
        />
      ))}
    </div>
  );
};
