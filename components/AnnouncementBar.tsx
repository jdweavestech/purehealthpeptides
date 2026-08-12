export function AnnouncementBar() {
  // Edit this single line to change the promo message site-wide.
  const message = 'FREE SHIPPING ON ORDERS OVER $175 — FREE VIAL VAULT ON ORDERS OVER $75';

  return (
    <div className="announcement-bar" role="note">
      {message}
    </div>
  );
}
