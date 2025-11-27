import { Moon, Sun } from 'lucide-react';
import Button from '@/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { useTheme } from '@/features/shared/providers/theme-provider';

export const ModeToggle = () => {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="secondary"
					size="sm"
					className="size-12 relative bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
				>
					<Sun className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration-500 text-gray-800" />
					<Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration-500 text-gray-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="z-1001 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-500"
			>
				<DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
