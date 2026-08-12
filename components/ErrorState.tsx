export function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again, or come back in a moment.',
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="error-state">
      <h3 className="error-state__title">{title}</h3>
      <p>{description}</p>
      {onRetry && (
        <button type="button" className="btn btn--secondary btn--sm" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
