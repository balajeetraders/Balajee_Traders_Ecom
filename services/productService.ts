
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

// Helper to map Supabase DB row (snake_case) to Product type (camelCase)
const mapSupabaseRowToProduct = (row: any): Product => {
  // Handle images: Prefer 'images' array, fallback to single 'image' wrapped in array
  const gallery = row.images && Array.isArray(row.images) && row.images.length > 0 
    ? row.images 
    : (row.image ? [row.image] : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800']);
    
  const primaryImage = gallery[0];

  return {
    id: row.id.toString(), // Ensure ID is a string
    name: row.name,
    price: Number(row.price),
    category: row.category || 'Uncategorized',
    room: row.room || 'Living Room',
    style: row.style || 'Contemporary',
    material: row.material || 'Standard',
    image: primaryImage,
    images: gallery,
    description: row.description || '',
    rating: Number(row.rating) || 4.5,
    reviewCount: Number(row.review_count) || 0,
    featured: row.featured === true,
    newArrival: row.new_arrival === true,
    colors: row.colors, // Assumes JSONB column storing array of {name, hex}
    sizes: row.sizes,   // Assumes Text[] column
  };
};

// Global state to track connection status for the UI
export let isUsingLiveData = false;

export const fetchProducts = async (): Promise<Product[]> => {
  // 1. Check if keys are configured
  if (!isSupabaseConfigured()) {
    console.warn("⚠️ Supabase credentials are still placeholders. Falling back to static data.");
    isUsingLiveData = false;
    return PRODUCTS;
  }

  try {
    // 2. Try fetching from Supabase
    const { data, error } = await supabase
      .from('products')
      .select('*');

    // 3. Handle specific DB errors
    if (error) {
      console.error("🔴 Supabase connection failed:", error.message);
      isUsingLiveData = false;
      return PRODUCTS; // Fallback to static
    }

    // 4. Handle empty table (connected but no data)
    if (!data || data.length === 0) {
      console.warn("⚠️ Supabase connected, but 'products' table is empty. Falling back to static data.");
      isUsingLiveData = false; // Technically live, but using static because live is empty
      return PRODUCTS;
    }

    // 5. Success
    console.log("✅ Successfully fetched data from Supabase backend.");
    isUsingLiveData = true;
    return data.map(mapSupabaseRowToProduct);

  } catch (error) {
    // 6. Network/Unexpected errors
    console.error("🔴 Network/Unexpected Error:", error);
    isUsingLiveData = false;
    return PRODUCTS;
  }
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  // Try static first if we know we are offline/unconfigured
  if (!isSupabaseConfigured()) {
    const p = PRODUCTS.find(p => p.id === id);
    return p ? { ...p, images: p.images || [p.image] } : undefined;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      // If not found in DB, try finding in static array as fallback (optional, useful for mixed content)
      console.warn(`Product ${id} not found in DB, checking static...`);
      const staticP = PRODUCTS.find(p => p.id === id);
      return staticP ? { ...staticP, images: staticP.images || [staticP.image] } : undefined;
    }

    return mapSupabaseRowToProduct(data);
  } catch (error) {
    console.error("CMS Fetch Error:", error);
    const staticP = PRODUCTS.find(p => p.id === id);
    return staticP ? { ...staticP, images: staticP.images || [staticP.image] } : undefined;
  }
};
