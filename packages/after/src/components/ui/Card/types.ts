import type { VariantProps } from 'class-variance-authority';
import { cardVariants } from './styles';
import type { HTMLAttributes } from 'react';

export interface CardRootProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}
