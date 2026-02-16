
import { Product, RoomType } from './types';

export const PRODUCTS: Product[] = [
  // BEST SELLERS (featured: true) - 9 items
  {
    id: 'l1',
    name: 'Aurum Velvet Sofa',
    price: 145000,
    category: 'Seating',
    room: 'Living Room',
    style: 'Contemporary',
    material: 'Velvet',
    image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
    price: 85000,
    category: 'Seating',
    room: 'Living Room',
    style: 'Mid-Century Modern',
    material: 'Leather',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Bentwood walnut shell paired with premium aniline leather upholstery.',
    rating: 5.0,
    reviewCount: 45,
    featured: true,
  },
  {
    id: 'd1',
    name: 'Nordic Oak Table',
    price: 95000,
    category: 'Tables',
    room: 'Dining Room',
    style: 'Scandinavian',
    material: 'Oak Wood',
    image: 'https://images.pexels.com/photos/890669/pexels-photo-890669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Minimalist solid oak dining table with a natural matte finish.',
    rating: 4.9,
    reviewCount: 85,
    featured: true,
  },
  {
    id: 'b1',
    name: 'Elysian Bed Frame',
    price: 180000,
    category: 'Beds',
    room: 'Bedroom',
    style: 'Minimalist',
    material: 'Linen',
    image: 'https://images.pexels.com/photos/6480198/pexels-photo-6480198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Breathe easy in the Elysian bed, wrapped in premium Belgian linen.',
    rating: 5.0,
    reviewCount: 92,
    featured: true,
  },
  {
    id: 'o2',
    name: 'Ergo Task Chair',
    price: 48000,
    category: 'Seating',
    room: 'Office',
    style: 'Contemporary',
    material: 'Steel',
    image: 'https://images.pexels.com/photos/1366872/pexels-photo-1366872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Dynamic lumbar support for high-performance work.',
    rating: 4.9,
    reviewCount: 210,
    featured: true
  },
  {
    id: 'l2',
    name: 'Ghost Marble Table',
    price: 72000,
    category: 'Tables',
    room: 'Living Room',
    style: 'Minimalist',
    material: 'Marble',
    image: 'https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Floating slab of Carrara marble with architectural glass legs.',
    rating: 4.9,
    reviewCount: 38,
    featured: true
  },
  {
    id: 's1',
    name: 'Bentwood Chair',
    price: 16000,
    category: 'Seating',
    room: 'Dining Room',
    style: 'Traditional',
    material: 'Oak Wood',
    image: 'https://images.pexels.com/photos/116910/pexels-photo-116910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A classic silhouette redefined with durable oak.',
    rating: 4.5,
    reviewCount: 56,
    featured: true
  },
  {
    id: 's2',
    name: 'Brutal Study Desk',
    price: 68000,
    category: 'Tables',
    room: 'Office',
    style: 'Industrial',
    material: 'Concrete & Wood',
    image: 'https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Functional art for your workspace.',
    rating: 4.7,
    reviewCount: 12,
    featured: true
  },
  {
    id: 's3',
    name: 'Infinite Bookshelf',
    price: 92000,
    category: 'Storage',
    room: 'Office',
    style: 'Minimalist',
    material: 'Steel',
    image: 'https://images.pexels.com/photos/2067569/pexels-photo-2067569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Modular steel shelving system.',
    rating: 4.7,
    reviewCount: 22,
    featured: true
  },

  // NEW ARRIVALS (newArrival: true) - 4 items
  {
    id: 'n1',
    name: 'Opal Pendant Light',
    price: 22000,
    category: 'Lighting',
    room: 'Living Room',
    style: 'Contemporary',
    material: 'Glass',
    image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Hand-blown frosted glass sphere with brushed gold accents.',
    rating: 4.6,
    reviewCount: 12,
    newArrival: true
  },
  {
    id: 'n2',
    name: 'Zen Nightstand',
    price: 34000,
    category: 'Storage',
    room: 'Bedroom',
    style: 'Scandinavian',
    material: 'Oak Wood',
    image: 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Floating oak storage with soft-close drawers.',
    rating: 4.8,
    reviewCount: 5,
    newArrival: true
  },
  {
    id: 'n3',
    name: 'Monolith Sideboard',
    price: 125000,
    category: 'Storage',
    room: 'Dining Room',
    style: 'Industrial',
    material: 'Concrete & Wood',
    image: 'https://images.pexels.com/photos/6636247/pexels-photo-6636247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'High-capacity storage with walnut doors.',
    rating: 4.8,
    reviewCount: 3,
    newArrival: true
  },
  {
    id: 'n4',
    name: 'Halo Floor Lamp',
    price: 24000,
    category: 'Lighting',
    room: 'Living Room',
    style: 'Minimalist',
    material: 'Steel',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A singular ring of light for an architectural glow.',
    rating: 4.7,
    reviewCount: 21,
    newArrival: true
  },

  // OTHER SHOP PRODUCTS
  {
    id: 's4',
    name: 'Study Desk Lamp',
    price: 12000,
    category: 'Lighting',
    room: 'Office',
    style: 'Industrial',
    material: 'Steel',
    image: 'https://images.pexels.com/photos/1036655/pexels-photo-1036655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Adjustable task lighting with USB port.',
    rating: 4.5,
    reviewCount: 41
  }
];

export const ROOMS: { id: string; type: RoomType; image: string; description: string; longDescription: string }[] = [
  {
    id: 'living-room',
    type: 'Living Room',
    image: 'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Where comfort meets conversation.',
    longDescription: 'Our living room curation focuses on the harmony between architectural presence and soft, tactile comfort.'
  },
  {
    id: 'bedroom',
    type: 'Bedroom',
    image: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Your personal retreat of calm.',
    longDescription: 'Natural materials and muted palettes create a sanctuary designed for profound serenity.'
  },
  {
    id: 'dining-room',
    type: 'Dining Room',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Crafted for meaningful gatherings.',
    longDescription: 'Discover tables and seating that frame life\'s most important conversations.'
  },
  {
    id: 'office',
    type: 'Office',
    image: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Inspired spaces for creative minds.',
    longDescription: 'Ergonomic precision meets minimalist luxury to elevate your professional sanctuary.'
  }
];

export const CATEGORIES = ['Seating', 'Tables', 'Beds', 'Lighting', 'Storage'];
export const MATERIALS = ['Velvet', 'Oak Wood', 'Linen', 'Marble', 'Leather', 'Steel', 'Concrete & Wood'];
export const STYLES = ['Minimalist', 'Scandinavian', 'Mid-Century Modern', 'Industrial', 'Contemporary', 'Traditional'];
