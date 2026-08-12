export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton skeleton-card__image" />
          <div className="skeleton skeleton-line skeleton-line--60" />
          <div className="skeleton skeleton-line skeleton-line--40" />
        </div>
      ))}
    </div>
  );
}
