import { createContext } from '@radix-ui/react-context';

type SelectContextValue = {
  size: 'sm' | 'md' | 'lg';
};

export const [SelectProvider, useSelectContext] =
  createContext<SelectContextValue>('Select', { size: 'md' });
