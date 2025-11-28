import type { AlertState, AlertSubscriber, AlertType } from './types';

let activeAlerts: Record<AlertType, AlertState | null> = {
  info: null,
  success: null,
  warning: null,
  error: null,
  default: null,
};

const subscribers = new Set<AlertSubscriber>();

function notify() {
  subscribers.forEach((subscriber) => subscriber());
}

export const alertStore = {
  subscribe(subscriber: AlertSubscriber) {
    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
    };
  },

  getSnapshot(): Record<AlertType, AlertState | null> {
    return activeAlerts;
  },

  openAlert(alert: AlertState) {
    const { type } = alert;
    activeAlerts = { ...activeAlerts, [type]: alert };
    notify();
  },

  closeAlert(type: AlertType) {
    activeAlerts = { ...activeAlerts, [type]: null };
    notify();
  },

  clearAlerts() {
    activeAlerts = {
      info: null,
      success: null,
      warning: null,
      error: null,
      default: null,
    };
    notify();
  },
};
