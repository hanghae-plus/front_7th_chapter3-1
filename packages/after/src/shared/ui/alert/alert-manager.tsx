import { useEffect } from 'react';
import { useAlert } from '@/shared/model/hooks/use-alert';
import Alert from './alert';
import { cn } from '../../lib/utils';

interface AlertManagerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function AlertManager({ className, ...props }: AlertManagerProps) {
  const { activeAlerts, onCloseAlert, onClearAlerts } = useAlert();

  const alerts = Object.values(activeAlerts).filter((alert) => alert !== null);

  useEffect(() => {
    return () => {
      onClearAlerts();
    };
  }, [onClearAlerts]);

  if (alerts.length === 0) return null;

  return (
    <div className={cn('flex flex-col gap-[10px]', className)} {...props}>
      {alerts.map((alert) => (
        <Alert key={alert.type} variant={alert.type}>
          <Alert.Icon />
          <Alert.Content>
            <Alert.Title>{alert.title}</Alert.Title>
            <Alert.Body>{alert.message}</Alert.Body>
          </Alert.Content>
          <Alert.Close onClick={() => onCloseAlert(alert.type)} />
        </Alert>
      ))}
    </div>
  );
}
