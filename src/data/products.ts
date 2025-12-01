export type Product = {
  id: string;
  title: string;
  price: number;
  rating: number;
  ratingCount?: number;
  category: 'wall-art' | 'lamps' | 'rugs' | 'plants' | 'furniture';
  style: 'modern' | 'boho' | 'minimal' | 'classic';
  images: string[];
  description: string;
};

export const products: Product[] = [
  {
    id: 'p1',
    title: 'Abstract Wall Art',
    price: 129,
    rating: 4.6,
    ratingCount: 128,
    category: 'wall-art',
    style: 'modern',
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1577083552431-6e5fd01621c7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1577083552925-2c1d5e44ce3a?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Premium canvas print with soft gold accents and warm neutrals.',
  },
  {
    id: 'p2',
    title: 'Matte Brass Table Lamp',
    price: 159,
    rating: 4.8,
    ratingCount: 264,
    category: 'lamps',
    style: 'minimal',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Soft ambient light with a premium brass finish and linen shade.',
  },
  {
    id: 'p3',
    title: 'Handwoven Wool Rug',
    price: 299,
    rating: 4.7,
    ratingCount: 89,
    category: 'rugs',
    style: 'boho',
    images: [
      'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580462766213-0a01ab8d8f82?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Thick, soft underfoot with subtle pattern for a cozy living space.',
  },
  {
    id: 'p4',
    title: 'Indoor Fiddle Leaf Fig',
    price: 89,
    rating: 4.5,
    ratingCount: 56,
    category: 'plants',
    style: 'classic',
    images: [
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616500163246-0ffbb43be0b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1597055181449-b9d2a4598a3f?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Lush greenery to bring nature indoors with minimal maintenance.',
  },
  {
    id: 'p5',
    title: 'Oak Lounge Chair',
    price: 549,
    rating: 4.9,
    ratingCount: 312,
    category: 'furniture',
    style: 'modern',
    images: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Sculpted silhouette with premium upholstery and warm oak frame.',
  },
];
