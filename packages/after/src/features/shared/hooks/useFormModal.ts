import { useState, useCallback } from 'react';

interface UseFormModalReturn<T> {
	isOpen: boolean;
	formData: Partial<T>;
	open: (initialData?: Partial<T>) => void;
	close: () => void;
	updateFormData: (data: Partial<T>) => void;
	resetFormData: () => void;
}

export const useFormModal = <T,>(defaultData: Partial<T> = {}): UseFormModalReturn<T> => {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState<Partial<T>>(defaultData);

	const open = useCallback((initialData?: Partial<T>) => {
		if (initialData) {
			setFormData(initialData);
		}
		setIsOpen(true);
	}, []);

	const close = useCallback(() => {
		setIsOpen(false);
		setFormData(defaultData);
	}, [defaultData]);

	const updateFormData = useCallback((data: Partial<T>) => {
		setFormData(data);
	}, []);

	const resetFormData = useCallback(() => {
		setFormData(defaultData);
	}, [defaultData]);

	return {
		isOpen,
		formData,
		open,
		close,
		updateFormData,
		resetFormData,
	};
};
