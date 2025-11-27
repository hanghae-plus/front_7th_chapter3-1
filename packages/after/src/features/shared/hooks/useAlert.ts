import { useState, useCallback } from 'react';

interface UseAlertReturn {
	showSuccess: boolean;
	showError: boolean;
	successMessage: string;
	errorMessage: string;
	displaySuccess: (message: string) => void;
	displayError: (message: string) => void;
	hideSuccess: () => void;
	hideError: () => void;
}

export const useAlert = (): UseAlertReturn => {
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const displaySuccess = useCallback((message: string) => {
		setSuccessMessage(message);
		setShowSuccess(true);
	}, []);

	const displayError = useCallback((message: string) => {
		setErrorMessage(message);
		setShowError(true);
	}, []);

	const hideSuccess = useCallback(() => {
		setShowSuccess(false);
	}, []);

	const hideError = useCallback(() => {
		setShowError(false);
	}, []);

	return {
		showSuccess,
		showError,
		successMessage,
		errorMessage,
		displaySuccess,
		displayError,
		hideSuccess,
		hideError,
	};
};
