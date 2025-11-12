import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { MenuItem } from '../types';

// NOTE: This component is duplicated from MenuPage to satisfy the request with minimal file changes.
// In a real-world scenario, this would be a shared component.
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


const HomePage: React.FC = () => {
  const { menuItems, addToCart } = useContext(AppContext);
  const featuredItems = menuItems.slice(0, 4);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    // Optionally, show a toast notification
  };

  return (
    <div className="bg-primary">
      {/* Hero Section */}
      <div 
        className="relative h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center text-center" 
        style={{ backgroundImage: "url('https://picsum.photos/id/1060/1920/1080')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
            ع- <span className="text-accent">بيروت</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-8">
            طعم الشاورما الأصيل... حكاية من قلب بيروت
          </p>
          <Link 
            to="/menu"
            className="bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-red-700 transition-transform transform hover:scale-105 duration-300"
          >
            تصفح المنيو
          </Link>
        </div>
      </div>

      {/* Featured Menu Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-center text-white mb-2">
            أطباقنا <span className="text-accent">المميزة</span>
          </h2>
          <p className="text-center text-gray-400 mb-12">تذوق أفضل ما لدينا، واختر ما يروق لك.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredItems.map(item => (
              <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="bg-transparent border-2 border-accent text-accent font-bold py-3 px-8 rounded-lg text-lg hover:bg-accent hover:text-white transition-colors duration-300"
            >
              عرض كامل المنيو
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
