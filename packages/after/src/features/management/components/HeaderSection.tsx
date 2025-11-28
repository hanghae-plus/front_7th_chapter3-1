import React from 'react';

type HeaderSectionProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export const HeaderSection: React.FC<HeaderSectionProps> = ({ title, description, actions }) => {
  return (
    <div className="flex items-start justify-between gap-4 pb-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex-shrink-0">{actions}</div>}
    </div>
  );
};
