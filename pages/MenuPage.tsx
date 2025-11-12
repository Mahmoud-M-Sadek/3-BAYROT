
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { MenuItem } from '../types';

const MenuItemCard: React.FC<{ item: MenuItem; onAddToCart: (item: MenuItem) => void }> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <img className="w-full h-48 object-cover" src={item.image} alt={item.name} />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white">{item.name}</h3>
        <p className="text-gray-400 mt-2 flex-grow">{item.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-black text-accent">{item.price} جم</span>
          <button
            onClick={() => onAddToCart(item)}
            className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center"
          >
            <ion-icon name="add-circle-outline" class="mr-2"></ion-icon>
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
};

const MenuPage: React.FC = () => {
  const { categories, menuItems, addToCart } = useContext(AppContext);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    // You can add a toast notification here for better UX
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategoryId ? item.categoryId === selectedCategoryId : true;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-primary py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-center text-white mb-2">
          قائمة <span className="text-accent">الطعام</span>
        </h2>
        <p className="text-center text-gray-400 mb-8">اختر ما تشتهي نفسك من أطباقنا المميزة</p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <input 
                type="text"
                placeholder="ابحث عن طبق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-1/3 bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
            />
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          <button
            onClick={() => setSelectedCategoryId(null)}
            className={`px-6 py-2 font-bold rounded-full transition-colors duration-300 ${
              selectedCategoryId === null ? 'bg-accent text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            الكل
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`px-6 py-2 font-bold rounded-full transition-colors duration-300 ${
                selectedCategoryId === category.id ? 'bg-accent text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map(item => (
              <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
            <p className="text-center text-gray-400 text-xl">لا توجد أصناف تطابق بحثك.</p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
