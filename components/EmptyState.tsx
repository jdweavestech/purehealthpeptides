import { BeakerIcon } from './icons';

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <BeakerIcon width={40} height={40} />
      </div>
      <h3 className="empty-state__title">{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}
