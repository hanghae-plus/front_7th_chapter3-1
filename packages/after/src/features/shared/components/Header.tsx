import { ModeToggle } from './ModeToggle';

export const Header = () => {
	return (
		<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-1000">
			<div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center h-16">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
						L
					</div>
					<div>
						<h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 m-0 leading-none">
							Hanghae Company
						</h1>
						<p className="text-xs text-gray-600 dark:text-gray-400 m-0 leading-none mt-0.5">
							Design System Migration Project
						</p>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<ModeToggle />
					<div className="text-right">
						<div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Demo User</div>
						<div className="text-xs text-gray-600 dark:text-gray-400">demo@example.com</div>
					</div>
					<div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-500 dark:text-primary-300 font-semibold text-base">
						DU
					</div>
				</div>
			</div>
		</header>
	);
};
