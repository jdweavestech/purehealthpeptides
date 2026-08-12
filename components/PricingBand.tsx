import { BULK_TIERS } from '@/lib/pricing/bulk-pricing';
import { FREE_SHIPPING_THRESHOLD, FREE_VIAL_VAULT_THRESHOLD } from '@/lib/pricing/shipping';

export function PricingBand() {
  const tiers = [...BULK_TIERS].filter((t) => t.discountPercent > 0).reverse();

  return (
    <section className="section section--tight">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Volume Pricing</span>
          <h2 className="section-heading__title">Buy more, save more</h2>
        </div>
        <div className="pricing-band">
          {tiers.map((tier) => (
            <div className="pricing-tier" key={tier.label}>
              <div className="pricing-tier__qty">{tier.label}</div>
              <div className="pricing-tier__off">{tier.discountPercent}% Off</div>
            </div>
          ))}
        </div>
        <div className="pricing-perks">
          <span className="pricing-perk">Free Vial Vault on orders over ${FREE_VIAL_VAULT_THRESHOLD}</span>
          <span className="pricing-perk">Free shipping on orders over ${FREE_SHIPPING_THRESHOLD}</span>
        </div>
      </div>
    </section>
  );
}
