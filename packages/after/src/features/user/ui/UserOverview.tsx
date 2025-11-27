import { Card } from "@/shared/ui";
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { cn } from "@/shared/utils/cn";

export type OverviewData = {
  label: string;
  value: number;
  color: string;
};

const getBorderColorClass = (color: string) => {
  switch (color) {
    case "green":
      return "border-green-500";
    case "yellow":
      return "border-yellow-500";
    case "red":
      return "border-red-500";
    case "blue":
      return "border-blue-500";
    default:
      return "";
  }
};

const getTextColorClass = (color: string) => {
  switch (color) {
    case "green":
      return "text-green-500";
    case "yellow":
      return "text-yellow-500";
    case "red":
      return "text-red-500";
    case "blue":
      return "text-blue-500";
    default:
      return "";
  }
};

export function UserOverview({
  overviewData,
}: {
  overviewData: OverviewData[];
}) {
  return (
    <div className="flex gap-2">
      {overviewData.map((data) => (
        <Card
          key={data.label}
          className={cn(
            "border rounded-1 w-full",
            getBorderColorClass(data.color)
          )}
        >
          <CardHeader>
            <CardTitle>
              <span className="text-xs font-normal">{data.label}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={cn(
                "text-2xl font-bold",
                getTextColorClass(data.color)
              )}
            >
              {data.value}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
