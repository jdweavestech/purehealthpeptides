import { FlaskIcon, ShieldIcon, DocumentIcon, BeakerIcon, TruckIcon } from './icons';

const ITEMS = [
  { icon: FlaskIcon, label: '99%+ Purity' },
  { icon: ShieldIcon, label: 'Independent U.S. Testing' },
  { icon: DocumentIcon, label: 'Batch-Level COAs' },
  { icon: BeakerIcon, label: 'Research Use Only' },
  { icon: TruckIcon, label: 'Fast, Discreet Shipping' },
];

export function TrustSection() {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="trust-grid">
          {ITEMS.map(({ icon: Icon, label }) => (
            <div className="trust-item" key={label}>
              <Icon className="trust-item__icon" width={28} height={28} />
              <div className="trust-item__label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
