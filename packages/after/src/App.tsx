import { ThemeProvider } from '@/features/shared/providers/theme-provider';
import { Header } from '@/features/shared/components/Header';
import ManagementPage from '@/pages/ManagementPage';
import '@/styles/components.css';

export const App = () => {
	return (
		<ThemeProvider defaultTheme="system" storageKey="front-lite-ui-theme">
			<div className="min-h-screen bg-gray-100 dark:bg-gray-900">
				<Header />
				<main>
					<ManagementPage />
				</main>
			</div>
		</ThemeProvider>
	);
};
