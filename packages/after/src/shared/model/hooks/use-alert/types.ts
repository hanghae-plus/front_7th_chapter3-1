export type AlertType = 'info' | 'success' | 'warning' | 'error' | 'default';

export interface AlertState {
  type: AlertType;
  message: string;
  title?: string;
}

export type AlertSubscriber = () => void;
