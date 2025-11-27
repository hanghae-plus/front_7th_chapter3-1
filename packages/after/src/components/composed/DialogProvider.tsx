import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { DialogContext, type DialogOptions } from '../../hooks/useDialog';

export function DialogProvider({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = React.useState(false);
	const [dialogOptions, setDialogOptions] =
		React.useState<DialogOptions | null>(null);

	const openDialog = (options: DialogOptions) => {
		setDialogOptions(options);
		setOpen(true);
	};

	const closeDialog = () => {
		setOpen(false);
		setDialogOptions(null);
	};

	return (
		<DialogContext.Provider value={{ openDialog, closeDialog }}>
			{children}

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						{dialogOptions?.title && (
							<DialogTitle>{dialogOptions.title}</DialogTitle>
						)}
					</DialogHeader>

					<div className='mt-4'>{dialogOptions?.content}</div>
				</DialogContent>
			</Dialog>
		</DialogContext.Provider>
	);
}
