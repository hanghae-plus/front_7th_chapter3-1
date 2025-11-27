import { createContext, useContext } from 'react';

export type DialogOptions = {
	title?: string;
	content: React.ReactNode;
};

export type DialogContextType = {
	openDialog: (options: DialogOptions) => void;
	closeDialog: () => void;
};

export const DialogContext = createContext<DialogContextType | null>(null);

export const useDialog = () => {
	const ctx = useContext(DialogContext);
	if (!ctx) throw new Error('useDialog must be used within DialogProvider');
	return ctx;
};
