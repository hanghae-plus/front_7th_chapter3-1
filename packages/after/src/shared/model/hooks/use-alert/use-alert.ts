import { useCallback, useSyncExternalStore } from 'react';
import { alertStore } from './alert-store';
import type { AlertType } from './types';

interface OpenAlertParams {
  type: AlertType;
  message: string;
  title?: string;
}

export function useAlert() {
  const activeAlerts = useSyncExternalStore(alertStore.subscribe, alertStore.getSnapshot);

  const onOpenAlert = useCallback(({ type, message, title }: OpenAlertParams) => {
    alertStore.openAlert({ type, message, title });
  }, []);

  const onCloseAlert = useCallback((type: AlertType) => {
    alertStore.closeAlert(type);
  }, []);

  const onClearAlerts = useCallback(() => {
    alertStore.clearAlerts();
  }, []);

  return {
    activeAlerts,
    onOpenAlert,
    onCloseAlert,
    onClearAlerts,
  };
}
