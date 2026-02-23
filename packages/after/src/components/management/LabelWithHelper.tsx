export const LabelWithHelper = ({
  label,
  helper,
}: {
  label: string;
  helper?: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-app-foreground">{label}</span>
      {helper && (
        <span className="text-xs text-app-text-tertiary">{helper}</span>
      )}
    </div>
  );
};
