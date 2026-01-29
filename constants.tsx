
import { Product, RoomType } from './types';

export const PRODUCTS: Product[] = [
  // BEST SELLERS (featured: true) - 9 items
  {
    id: 'l1',
    name: 'Aurum Velvet Sofa',
    price: 1850,
    category: 'Seating',
    room: 'Living Room',
    style: 'Contemporary',
    material: 'Velvet',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
    description: 'A masterpiece of comfort and elegance. Hand-tufted velvet and brushed brass legs.',
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    colors: [{ name: 'Emerald', hex: '#047857' }, { name: 'Midnight', hex: '#1e1b4b' }],
    sizes: ['3-Seater', '4-Seater'],
    dimensions: 'W: 240cm H: 85cm D: 100cm'
  },
  {
    id: 'l3',
    name: 'Icon Lounge Chair',
    price: 1100,
    category: 'Seating',
    room: 'Living Room',
    style: 'Mid-Century Modern',
    material: 'Leather',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1200',
    description: 'Bentwood walnut shell paired with premium aniline leather upholstery.',
    rating: 5.0,
    reviewCount: 45,
    featured: true,
  },
  {
    id: 'd1',
    name: 'Nordic Oak Table',
    price: 1200,
    category: 'Tables',
    room: 'Dining Room',
    style: 'Scandinavian',
    material: 'Oak Wood',
    image: 'https://images.unsplash.com/photo-1577145900570-3c0560602953?auto=format&fit=crop&q=80&w=1200',
    description: 'Minimalist solid oak dining table with a natural matte finish.',
    rating: 4.9,
    reviewCount: 85,
    featured: true,
  },
  {
    id: 'b1',
    name: 'Elysian Bed Frame',
    price: 2400,
    category: 'Beds',
    room: 'Bedroom',
    style: 'Minimalist',
    material: 'Linen',
    image: 'https://images.unsplash.com/photo-1505693419148-403bb097e275?auto=format&fit=crop&q=80&w=1200',
    description: 'Breathe easy in the Elysian bed, wrapped in premium Belgian linen.',
    rating: 5.0,
    reviewCount: 92,
    featured: true,
  },
  {
    id: 'o2',
    name: 'Ergo Task Chair',
    price: 640,
    category: 'Seating',
    room: 'Office',
    style: 'Contemporary',
    material: 'Steel',
    image: 'https://images.unsplash.com/photo-1505797149-43b007662c21?auto=format&fit=crop&q=80&w=1200',
    description: 'Dynamic lumbar support for high-performance work.',
    rating: 4.9,
    reviewCount: 210,
    featured: true
  },
  {
    id: 'l2',
    name: 'Ghost Marble Table',
    price: 950,
    category: 'Tables',
    room: 'Living Room',
    style: 'Minimalist',
    material: 'Marble',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200',
    description: 'Floating slab of Carrara marble with architectural glass legs.',
    rating: 4.9,
    reviewCount: 38,
    featured: true
  },
  {
    id: 's1',
    name: 'Bentwood Chair',
    price: 220,
    category: 'Seating',
    room: 'Dining Room',
    style: 'Traditional',
    material: 'Oak Wood',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=1200',
    description: 'A classic silhouette redefined with durable oak.',
    rating: 4.5,
    reviewCount: 56,
    featured: true
  },
  {
    id: 's2',
    name: 'Brutal Study Desk',
    price: 890,
    category: 'Tables',
    room: 'Office',
    style: 'Industrial',
    material: 'Concrete & Wood',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1200',
    description: 'Functional art for your workspace.',
    rating: 4.7,
    reviewCount: 12,
    featured: true
  },
  {
    id: 's3',
    name: 'Infinite Bookshelf',
    price: 1200,
    category: 'Storage',
    room: 'Office',
    style: 'Minimalist',
    material: 'Steel',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=1200',
    description: 'Modular steel shelving system.',
    rating: 4.7,
    reviewCount: 22,
    featured: true
  },

  // NEW ARRIVALS (newArrival: true) - 4 items
  {
    id: 'n1',
    name: 'Opal Pendant Light',
    price: 280,
    category: 'Lighting',
    room: 'Living Room',
    style: 'Contemporary',
    material: 'Glass',
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=1200',
    description: 'Hand-blown frosted glass sphere with brushed gold accents.',
    rating: 4.6,
    reviewCount: 12,
    newArrival: true
  },
  {
    id: 'n2',
    name: 'Zen Nightstand',
    price: 450,
    category: 'Storage',
    room: 'Bedroom',
    style: 'Scandinavian',
    material: 'Oak Wood',
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1200',
    description: 'Floating oak storage with soft-close drawers.',
    rating: 4.8,
    reviewCount: 5,
    newArrival: true
  },
  {
    id: 'n3',
    name: 'Monolith Sideboard',
    price: 1600,
    category: 'Storage',
    room: 'Dining Room',
    style: 'Industrial',
    material: 'Concrete & Wood',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1200',
    description: 'High-capacity storage with walnut doors.',
    rating: 4.8,
    reviewCount: 3,
    newArrival: true
  },
  {
    id: 'n4',
    name: 'Halo Floor Lamp',
    price: 320,
    category: 'Lighting',
    room: 'Living Room',
    style: 'Minimalist',
    material: 'Steel',
    image: 'https://images.unsplash.com/photo-1507473884658-c70b6559fa91?auto=format&fit=crop&q=80&w=1200',
    description: 'A singular ring of light for an architectural glow.',
    rating: 4.7,
    reviewCount: 21,
    newArrival: true
  },

  // OTHER SHOP PRODUCTS
  {
    id: 's4',
    name: 'Study Desk Lamp',
    price: 180,
    category: 'Lighting',
    room: 'Office',
    style: 'Industrial',
    material: 'Steel',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=1200',
    description: 'Adjustable task lighting with USB port.',
    rating: 4.5,
    reviewCount: 41
  }
];

export const ROOMS: { id: string; type: RoomType; image: string; description: string; longDescription: string }[] = [
  {
    id: 'living-room',
    type: 'Living Room',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=2000',
    description: 'Where comfort meets conversation.',
    longDescription: 'Our living room curation focuses on the harmony between architectural presence and soft, tactile comfort.'
  },
  {
    id: 'bedroom',
    type: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1616594106291-141786d8d7f4?auto=format&fit=crop&q=80&w=2000',
    description: 'Your personal retreat of calm.',
    longDescription: 'Natural materials and muted palettes create a sanctuary designed for profound serenity.'
  },
  {
    id: 'dining-room',
    type: 'Dining Room',
    image: 'https://images.unsplash.com/photo-1617806118233-18e16208a50a?auto=format&fit=crop&q=80&w=2000',
    description: 'Crafted for meaningful gatherings.',
    longDescription: 'Discover tables and seating that frame life\'s most important conversations.'
  },
  {
    id: 'office',
    type: 'Office',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000',
    description: 'Inspired spaces for creative minds.',
    longDescription: 'Ergonomic precision meets minimalist luxury to elevate your professional sanctuary.'
  }
];

export const CATEGORIES = ['Seating', 'Tables', 'Beds', 'Lighting', 'Storage'];
export const MATERIALS = ['Velvet', 'Oak Wood', 'Linen', 'Marble', 'Leather', 'Steel', 'Concrete & Wood'];
export const STYLES = ['Minimalist', 'Scandinavian', 'Mid-Century Modern', 'Industrial', 'Contemporary', 'Traditional'];
