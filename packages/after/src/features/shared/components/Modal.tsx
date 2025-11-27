import React, { useEffect } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	size?: 'small' | 'medium' | 'large';
	showFooter?: boolean;
	footerContent?: React.ReactNode;
}

export const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	size = 'medium',
	showFooter = false,
	footerContent,
}: ModalProps) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	if (!isOpen) return null;

	const sizeClasses = {
		small: 'w-full max-w-[400px]',
		medium: 'w-full max-w-[600px]',
		large: 'w-full max-w-[900px]',
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4"
			onClick={onClose}
		>
			<div
				className={`bg-white dark:bg-gray-800 rounded flex flex-col max-h-[90vh] font-sans shadow-[0px_11px_15px_-7px_rgba(0,0,0,0.2),0px_24px_38px_3px_rgba(0,0,0,0.14),0px_9px_46px_8px_rgba(0,0,0,0.12)] ${sizeClasses[size]}`}
				onClick={(e) => e.stopPropagation()}
			>
				{title && (
					<div className="px-6 py-4 border-b border-black/12 dark:border-white/12 flex justify-between items-center">
						<h3 className="m-0 text-xl font-medium text-black/87 dark:text-white/87">{title}</h3>
						<button
							className="bg-transparent border-none text-2xl leading-none text-black/54 dark:text-white/54 cursor-pointer p-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-black/4 dark:hover:bg-white/4"
							onClick={onClose}
						>
							×
						</button>
					</div>
				)}
				<div className="p-6 overflow-y-auto flex-1">{children}</div>
				{showFooter && footerContent && (
					<div className="px-6 py-4 border-t border-black/12 dark:border-white/12 flex gap-2 justify-end">
						{footerContent}
					</div>
				)}
			</div>
		</div>
	);
};
