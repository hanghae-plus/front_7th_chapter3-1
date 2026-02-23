import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardProps {
  variant:
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "muted"
    | null
    | undefined;
  title?: string;
  description?: string;
}

export const InfoCard: React.FC<CardProps> = ({
  variant,
  title,
  description,
}) => {
  return (
    <Card className="w-full" variant={variant}>
      <CardHeader>
        <CardDescription className="mb-[4px]">{description}</CardDescription>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};
