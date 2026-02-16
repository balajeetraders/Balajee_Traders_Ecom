
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  room: string;
  style: string;
  material: string;
  image: string; // Primary thumbnail (compatibility)
  images?: string[]; // Full gallery
  description: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  newArrival?: boolean;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  dimensions?: string;
}

export type RoomType = 'Living Room' | 'Bedroom' | 'Dining Room' | 'Office' | 'Outdoors';

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: CartItem[];
  total: number;
}
