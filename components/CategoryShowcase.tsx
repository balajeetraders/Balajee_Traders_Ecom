
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sofa, Lamp, Archive, Armchair, LampCeiling, Box } from 'lucide-react';

const CATEGORIES = [
  { name: 'Storage', count: 74, icon: Archive },
  { name: 'Seating', count: 84, icon: Armchair },
  { name: 'Lighting', count: 42, icon: Lamp },
  { name: 'Tables', count: 31, icon: LampCeiling },
  { name: 'Beds', count: 56, icon: Sofa },
  { name: 'Stool', count: 18, icon: Box },
];

const CategoryShowcase: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (catName: string) => {
    navigate(`/shop?category=${encodeURIComponent(catName)}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">On demand</span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Featured categories</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-stone-100 border border-stone-100">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group bg-white p-10 flex flex-col items-center justify-center gap-6 transition-all hover:bg-stone-50"
            >
              <div className="relative">
                <cat.icon size={40} strokeWidth={1} className="text-stone-400 group-hover:text-stone-900 transition-colors" />
                <span className="absolute -top-2 -right-4 w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center text-[10px] font-bold text-stone-500 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                  {cat.count}
                </span>
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-stone-400 group-hover:text-stone-900 transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
