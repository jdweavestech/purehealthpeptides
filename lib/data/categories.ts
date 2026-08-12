import type { Category } from '@/lib/types';

export const categories: Category[] = [
  {
    id: 'cat-oncology',
    slug: 'oncology-cell-fate',
    name: 'Oncology & Cell Fate',
    shortDescription: 'Compounds studied for roles in cell proliferation, apoptosis, and tumor biology research.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop',
    productCount: 4,
  },
  {
    id: 'cat-regeneration',
    slug: 'regeneration-longevity',
    name: 'Regeneration & Longevity',
    shortDescription: 'Peptides investigated for tissue repair, recovery pathways, and cellular aging research.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop',
    productCount: 6,
  },
  {
    id: 'cat-reproductive',
    slug: 'reproductive-neuroendocrine',
    name: 'Reproductive & Neuroendocrine',
    shortDescription: 'Research compounds related to hormonal signaling and neuroendocrine pathways.',
    image: 'https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?q=80&w=1200&auto=format&fit=crop',
    productCount: 3,
  },
  {
    id: 'cat-cognitive',
    slug: 'cognitive-neuro',
    name: 'Cognitive & Neuro',
    shortDescription: 'Peptides studied in models of neural signaling, cognition, and neuroprotection.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1200&auto=format&fit=crop',
    productCount: 4,
  },
  {
    id: 'cat-dermal',
    slug: 'dermal-hair-tissue',
    name: 'Dermal, Hair & Tissue Appearance',
    shortDescription: 'Compounds investigated for roles in skin, follicle, and connective tissue research.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop',
    productCount: 3,
  },
  {
    id: 'cat-growth',
    slug: 'growth-repair',
    name: 'Growth & Repair',
    shortDescription: 'Growth-factor-related peptides studied for musculoskeletal repair pathways.',
    image: 'https://images.unsplash.com/photo-1583912372116-9c9ba6a29b5f?q=80&w=1200&auto=format&fit=crop',
    productCount: 5,
  },
  {
    id: 'cat-immune',
    slug: 'immune-inflammatory',
    name: 'Immune & Inflammatory',
    shortDescription: 'Research compounds studied in models of immune modulation and inflammatory response.',
    image: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=1200&auto=format&fit=crop',
    productCount: 3,
  },
  {
    id: 'cat-metabolic',
    slug: 'metabolic',
    name: 'Metabolic',
    shortDescription: 'Peptides investigated for roles in metabolic regulation and energy balance research.',
    image: 'https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?q=80&w=1200&auto=format&fit=crop',
    productCount: 4,
  },
  {
    id: 'cat-mitochondrial',
    slug: 'mitochondrial-cellular-energy',
    name: 'Mitochondrial & Cellular Energy',
    shortDescription: 'Compounds studied for their relevance to mitochondrial function and cellular energy pathways.',
    image: 'https://images.unsplash.com/photo-1614308457932-e6d70c9d21bb?q=80&w=1200&auto=format&fit=crop',
    productCount: 2,
  },
  {
    id: 'cat-solvents',
    slug: 'solvents-reconstitution',
    name: 'Solvents & Reconstitution',
    shortDescription: 'Bacteriostatic water and reconstitution supplies for laboratory research use.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1200&auto=format&fit=crop',
    productCount: 2,
  },
];

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
