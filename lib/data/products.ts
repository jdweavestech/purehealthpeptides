import type { Product } from '@/lib/types';

const img = (id: string, alt: string) => ({
  url: `https://images.unsplash.com/${id}?q=80&w=1000&auto=format&fit=crop`,
  alt,
});

const rawProducts: Omit<Product, 'hasVariations'>[] = [
  {
    id: 'p-bpc157',
    slug: 'bpc-157',
    name: 'BPC-157',
    shortDescription: 'Pentadecapeptide studied in tissue-repair research models.',
    description:
      'BPC-157 is a synthetic pentadecapeptide sequence widely referenced in preclinical literature exploring tissue repair, angiogenesis, and gut-barrier signaling pathways. Supplied for laboratory research use only.',
    categorySlugs: ['regeneration-longevity', 'growth-repair'],
    format: 'vial',
    images: [
      img('photo-1587854692152-cbe660dbde88', 'BPC-157 research vial'),
      img('photo-1618022649506-9dfc3ba9f2d0', 'BPC-157 vial with box'),
    ],
    variations: [
      { id: 'v1', label: '5mg', price: 42, sku: 'BPC-5', stockStatus: 'in-stock' },
      { id: 'v2', label: '10mg', price: 68, sku: 'BPC-10', stockStatus: 'in-stock' },
    ],
    basePrice: 42,
    stockStatus: 'in-stock',
    featured: true,
    researchApplications: ['Tissue repair pathway studies', 'Angiogenesis research', 'Gut-barrier signaling models'],
    specifications: [
      { label: 'Sequence length', value: '15 amino acids' },
      { label: 'Purity', value: '≥99%' },
      { label: 'Form', value: 'Lyophilized powder' },
      { label: 'Storage', value: 'Store at -20°C, protect from light' },
    ],
    coaId: 'BPC157-2406A',
    infoCardId: 'ic-bpc157',
  },
  {
    id: 'p-tb500',
    slug: 'tb-500',
    name: 'TB-500',
    shortDescription: 'Thymosin Beta-4 fragment studied in recovery and actin research.',
    description:
      'TB-500 is a synthetic fragment of Thymosin Beta-4 referenced in research on cell migration, actin regulation, and recovery-related signaling. Supplied strictly for laboratory research use.',
    categorySlugs: ['regeneration-longevity', 'growth-repair'],
    format: 'vial',
    images: [img('photo-1583912267550-d6c2ac3196c0', 'TB-500 research vial')],
    variations: [
      { id: 'v1', label: '2mg', price: 38, sku: 'TB-2', stockStatus: 'in-stock' },
      { id: 'v2', label: '5mg', price: 74, sku: 'TB-5', stockStatus: 'low-stock' },
    ],
    basePrice: 38,
    stockStatus: 'in-stock',
    featured: true,
    researchApplications: ['Actin regulation studies', 'Cell migration research', 'Recovery pathway models'],
    specifications: [
      { label: 'Sequence', value: 'Thymosin Beta-4 fragment (17–23)' },
      { label: 'Purity', value: '≥99%' },
      { label: 'Form', value: 'Lyophilized powder' },
    ],
    coaId: 'TB500-2406B',
    infoCardId: 'ic-tb500',
  },
  {
    id: 'p-cjc1295',
    slug: 'cjc-1295',
    name: 'CJC-1295',
    shortDescription: 'GHRH analog studied in growth-hormone secretagogue research.',
    description:
      'CJC-1295 is a growth-hormone-releasing hormone (GHRH) analog referenced in research on the somatotropic axis and pulsatile secretion models. Research use only.',
    categorySlugs: ['reproductive-neuroendocrine', 'growth-repair'],
    format: 'vial',
    images: [img('photo-1620916566398-39f1143ab7be', 'CJC-1295 research vial')],
    variations: [
      { id: 'v1', label: '2mg', price: 45, sku: 'CJC-2', stockStatus: 'in-stock' },
      { id: 'v2', label: '5mg', price: 89, sku: 'CJC-5', stockStatus: 'in-stock' },
    ],
    basePrice: 45,
    stockStatus: 'in-stock',
    featured: true,
    researchApplications: ['Somatotropic axis studies', 'Secretagogue pathway research'],
    specifications: [
      { label: 'Class', value: 'GHRH analog' },
      { label: 'Purity', value: '≥98%' },
      { label: 'Form', value: 'Lyophilized powder' },
    ],
    coaId: 'CJC1295-2406A',
    infoCardId: 'ic-cjc1295',
  },
  {
    id: 'p-aod9604',
    slug: 'aod-9604',
    name: 'AOD-9604',
    shortDescription: 'Modified hGH fragment studied in lipid metabolism research.',
    description:
      'AOD-9604 is a modified fragment of human growth hormone (176-191) referenced in metabolic research literature exploring lipolysis and adipocyte signaling. Supplied for research use only.',
    categorySlugs: ['metabolic'],
    format: 'vial',
    images: [img('photo-1554475900-0a0350e3fc7b', 'AOD-9604 research vial')],
    variations: [
      { id: 'v1', label: '5mg', price: 49, sku: 'AOD-5', stockStatus: 'in-stock' },
    ],
    basePrice: 49,
    stockStatus: 'in-stock',
    featured: true,
    researchApplications: ['Lipolysis signaling studies', 'Adipocyte metabolism research'],
    specifications: [
      { label: 'Class', value: 'hGH fragment (176-191)' },
      { label: 'Purity', value: '≥98%' },
      { label: 'Form', value: 'Lyophilized powder' },
    ],
    coaId: 'AOD9604-2406A',
    infoCardId: 'ic-aod9604',
  },
  {
    id: 'p-aicar',
    slug: 'aicar',
    name: 'AICAR',
    shortDescription: 'AMPK activator studied in cellular energy metabolism research.',
    description:
      'AICAR is a nucleotide analog widely referenced in research exploring AMPK activation and cellular energy homeostasis pathways. Supplied for laboratory research use only.',
    categorySlugs: ['mitochondrial-cellular-energy', 'metabolic'],
    format: 'vial',
    images: [img('photo-1614308457932-e6d70c9d21bb', 'AICAR research vial')],
    variations: [
      { id: 'v1', label: '50mg', price: 64, sku: 'AICAR-50', stockStatus: 'in-stock' },
    ],
    basePrice: 64,
    stockStatus: 'in-stock',
    featured: true,
    researchApplications: ['AMPK activation studies', 'Cellular energy homeostasis research'],
    specifications: [
      { label: 'Class', value: 'AMP-activated protein kinase agonist' },
      { label: 'Purity', value: '≥98%' },
      { label: 'Form', value: 'Lyophilized powder' },
    ],
    coaId: 'AICAR-2406A',
    infoCardId: 'ic-aicar',
  },
  {
    id: 'p-5amino1mq',
    slug: '5-amino-1mq',
    name: '5-Amino-1MQ',
    shortDescription: 'Small-molecule NNMT inhibitor studied in metabolic research.',
    description:
      '5-Amino-1MQ is a small-molecule inhibitor of nicotinamide N-methyltransferase (NNMT) referenced in preclinical metabolic research. Supplied for laboratory research use only.',
    categorySlugs: ['metabolic'],
    format: 'capsule',
    images: [img('photo-1628595351029-c2bf17511435', '5-Amino-1MQ capsules')],
    variations: [
      { id: 'v1', label: '30 capsules / 50mg', price: 58, sku: '5A1MQ-30', stockStatus: 'in-stock' },
      { id: 'v2', label: '60 capsules / 50mg', price: 98, sku: '5A1MQ-60', stockStatus: 'in-stock' },
    ],
    basePrice: 58,
    stockStatus: 'in-stock',
    featured: true,
    researchApplications: ['NNMT inhibition studies', 'Adipocyte metabolism research'],
    specifications: [
      { label: 'Class', value: 'Small-molecule NNMT inhibitor' },
      { label: 'Form', value: 'Capsule' },
    ],
    coaId: '5A1MQ-2406A',
    infoCardId: 'ic-5amino',
  },
  {
    id: 'p-ghkcu',
    slug: 'ghk-cu',
    name: 'GHK-Cu',
    shortDescription: 'Copper peptide complex studied in dermal and connective tissue research.',
    description:
      'GHK-Cu is a naturally occurring copper-binding tripeptide complex referenced extensively in dermatological and connective-tissue research literature. Research use only.',
    categorySlugs: ['dermal-hair-tissue', 'regeneration-longevity'],
    format: 'topical',
    images: [img('photo-1620916566398-39f1143ab7be', 'GHK-Cu topical research formulation')],
    variations: [
      { id: 'v1', label: '50mL topical', price: 52, sku: 'GHKCU-50', stockStatus: 'in-stock' },
    ],
    basePrice: 52,
    stockStatus: 'in-stock',
    featured: false,
    researchApplications: ['Dermal signaling studies', 'Connective tissue remodeling research'],
    specifications: [
      { label: 'Class', value: 'Copper tripeptide complex' },
      { label: 'Form', value: 'Topical solution' },
    ],
    coaId: 'GHKCU-2406A',
    infoCardId: 'ic-ghkcu',
  },
  {
    id: 'p-selank',
    slug: 'selank',
    name: 'Selank',
    shortDescription: 'Synthetic peptide analog studied in neuro-behavioral research models.',
    description:
      'Selank is a synthetic heptapeptide analog referenced in research literature exploring neuro-behavioral signaling pathways. Supplied strictly for laboratory research use.',
    categorySlugs: ['cognitive-neuro'],
    format: 'liquid',
    images: [img('photo-1559757175-5700dde675bc', 'Selank research nasal solution')],
    variations: [
      { id: 'v1', label: '10mL nasal solution', price: 46, sku: 'SEL-10', stockStatus: 'in-stock' },
    ],
    basePrice: 46,
    stockStatus: 'in-stock',
    featured: false,
    researchApplications: ['Neuro-behavioral signaling studies'],
    specifications: [
      { label: 'Class', value: 'Synthetic heptapeptide analog' },
      { label: 'Form', value: 'Liquid solution' },
    ],
    coaId: 'SELANK-2406A',
    infoCardId: 'ic-selank',
  },
  {
    id: 'p-epithalon',
    slug: 'epithalon',
    name: 'Epithalon',
    shortDescription: 'Synthetic tetrapeptide studied in cellular aging research.',
    description:
      'Epithalon is a synthetic tetrapeptide referenced in research literature exploring telomerase activity and cellular senescence models. Research use only.',
    categorySlugs: ['regeneration-longevity', 'oncology-cell-fate'],
    format: 'vial',
    images: [img('photo-1532187863486-abf9dbad1b69', 'Epithalon research vial')],
    variations: [
      { id: 'v1', label: '10mg', price: 44, sku: 'EPI-10', stockStatus: 'in-stock' },
    ],
    basePrice: 44,
    stockStatus: 'in-stock',
    featured: false,
    researchApplications: ['Telomerase activity studies', 'Cellular senescence research'],
    specifications: [
      { label: 'Sequence length', value: '4 amino acids' },
      { label: 'Purity', value: '≥99%' },
    ],
    coaId: 'EPITHALON-2406A',
    infoCardId: 'ic-epithalon',
  },
  {
    id: 'p-bacwater',
    slug: 'bacteriostatic-water',
    name: 'Bacteriostatic Water',
    shortDescription: 'Sterile reconstitution solvent for laboratory research use.',
    description:
      'Bacteriostatic water containing 0.9% benzyl alcohol, used for reconstitution of lyophilized research compounds in laboratory settings.',
    categorySlugs: ['solvents-reconstitution'],
    format: 'liquid',
    images: [img('photo-1587854692152-cbe660dbde88', 'Bacteriostatic water vial')],
    variations: [
      { id: 'v1', label: '30mL', price: 16, sku: 'BAC-30', stockStatus: 'in-stock' },
    ],
    basePrice: 16,
    stockStatus: 'in-stock',
    featured: false,
    researchApplications: ['Reconstitution of lyophilized peptides'],
    specifications: [
      { label: 'Composition', value: '0.9% benzyl alcohol, USP water' },
      { label: 'Sterility', value: '0.22µm filtered' },
    ],
    coaId: 'BACWATER-2406A',
    infoCardId: 'ic-bacwater',
  },
];

export const products: Product[] = rawProducts.map((p) => ({
  ...p,
  hasVariations: p.variations.length > 1,
}));

export function getProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlugs.includes(categorySlug));
}

export interface ProductFilters {
  category?: string;
  format?: string;
  search?: string;
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
}

export function getFilteredProducts(filters: ProductFilters): Product[] {
  let result = [...products];

  if (filters.category) {
    result = result.filter((p) => p.categorySlugs.includes(filters.category!));
  }
  if (filters.format) {
    result = result.filter((p) => p.format === filters.format);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    );
  }

  switch (filters.sort) {
    case 'price-asc':
      result.sort((a, b) => a.basePrice - b.basePrice);
      break;
    case 'price-desc':
      result.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      result.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  return result;
}

export function getProductVariations(slug: string) {
  return getProductBySlug(slug)?.variations ?? [];
}
