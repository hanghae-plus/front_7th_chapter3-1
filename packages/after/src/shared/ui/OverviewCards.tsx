import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";

export type OverviewData = {
  label: string;
  value: number;
  color: string;
};

export function OverviewCards({
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
            "border rounded-1 w-full p-4",
            getBorderColorClass(data.color),
            getBgColorClass(data.color)
          )}
        >
          <CardContent className="p-0 flex flex-col gap-1">
            <CardHeader className="p-0">
              <CardTitle>
                <span className="text-gray-700 text-xs font-normal">
                  {data.label}
                </span>
              </CardTitle>
            </CardHeader>
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
    case "gray":
      return "border-gray-300";
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
    case "gray":
      return "text-gray-500";
    default:
      return "";
  }
};

const getBgColorClass = (color: string) => {
  switch (color) {
    case "green":
      return "bg-green-50";
    case "yellow":
      return "bg-yellow-50";
    case "red":
      return "bg-red-50";
    case "blue":
      return "bg-blue-50";
    case "gray":
      return "bg-gray-50";
    default:
      return "";
  }
};
