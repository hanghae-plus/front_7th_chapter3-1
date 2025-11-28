import { useState, useCallback } from 'react';

interface UseAlertsReturn {
  showSuccessAlert: boolean;
  showErrorAlert: boolean;
  alertMessage: string;
  errorMessage: string;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  hideSuccess: () => void;
  hideError: () => void;
}

export const useAlerts = (): UseAlertsReturn => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showSuccess = useCallback((message: string) => {
    setAlertMessage(message);
    setShowSuccessAlert(true);
  }, []);

  const showError = useCallback((message: string) => {
    setErrorMessage(message);
    setShowErrorAlert(true);
  }, []);

  const hideSuccess = useCallback(() => {
    setShowSuccessAlert(false);
  }, []);

  const hideError = useCallback(() => {
    setShowErrorAlert(false);
  }, []);

  return {
    showSuccessAlert,
    showErrorAlert,
    alertMessage,
    errorMessage,
    showSuccess,
    showError,
    hideSuccess,
    hideError,
  };
};

