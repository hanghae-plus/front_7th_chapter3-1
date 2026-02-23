import { Check, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface InfoAlertProps {
  variant:
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "muted"
    | null
    | undefined;
  title: string;
  description: string;
  onClose: () => void;
}

export const InfoAlert: React.FC<InfoAlertProps> = ({
  variant,
  title,
  description,
  onClose,
}) => {
  return (
    <div className="grid w-full items-start gap-4">
      <Alert variant={variant}>
        <Check />
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </div>
        <div className="ml-auto">
          <Button variant="icon" onClick={onClose}>
            <X />
          </Button>
        </div>
      </Alert>
    </div>
  );
};
