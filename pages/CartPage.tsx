
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, placeOrder } = useContext(AppContext);
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('الرجاء إدخال جميع البيانات المطلوبة.');
      return;
    }
    setIsSubmitting(true);
    placeOrder(customerInfo);

    // Construct WhatsApp message
    const itemsText = cart.map(item => `${item.name} (x${item.quantity})`).join('\n');
    const message = `طلب جديد من مطعم  ع -بيروت:\n\nالاسم: ${customerInfo.name}\nالهاتف: ${customerInfo.phone}\nالعنوان: ${customerInfo.address}\n\nالأصناف:\n${itemsText}\n\nالمجموع: ${total} جم`;

    const whatsappUrl = `https://wa.me/201044644693?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');

    // Navigate back to menu after a short delay
    setTimeout(() => {
        navigate('/menu');
    }, 1000);
  };

  if (cart.length === 0 && !isSubmitting) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <ion-icon name="cart-outline" class="text-9xl text-gray-600 mx-auto"></ion-icon>
        <h2 className="text-3xl font-bold text-white mt-4">سلة التسوق فارغة</h2>
        <p className="text-gray-400 mt-2">لم تقم بإضافة أي منتجات حتى الآن.</p>
        <Link 
          to="/menu"
          className="mt-6 inline-block bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-red-700 transition-colors duration-300"
        >
          اذهب إلى المنيو
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-primary py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-center text-white mb-8">
          سلة <span className="text-accent">الطلبات</span>
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 bg-gray-900 p-6 rounded-lg">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b border-gray-700 py-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md"/>
                  <div>
                    <h3 className="font-bold text-lg text-white">{item.name}</h3>
                    <p className="text-accent font-semibold">{item.price} جم</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-800 rounded-full p-1">
                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="text-white w-8 h-8 rounded-full hover:bg-accent transition-colors">
                      <ion-icon name="add-outline"></ion-icon>
                    </button>
                    <span className="font-bold text-white w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="text-white w-8 h-8 rounded-full hover:bg-accent transition-colors">
                      <ion-icon name="remove-outline"></ion-icon>
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <ion-icon name="trash-outline" class="text-2xl"></ion-icon>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Form */}
          <div className="lg:w-1/3 bg-gray-900 p-6 rounded-lg h-fit sticky top-24">
            <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-4">ملخص الطلب</h3>
            <div className="flex justify-between items-center my-4">
              <span className="text-gray-300">المجموع الفرعي</span>
              <span className="font-bold text-white">{total} جم</span>
            </div>
            <div className="flex justify-between items-center my-4 text-2xl">
              <span className="text-gray-300">المجموع الكلي</span>
              <span className="font-black text-accent">{total} جم</span>
            </div>
            
            <form onSubmit={handleSubmitOrder} className="mt-6">
                <h4 className="text-xl font-bold text-white mb-4">بيانات التوصيل</h4>
                <div className="space-y-4">
                    <input type="text" name="name" placeholder="الاسم الكامل" required value={customerInfo.name} onChange={handleInputChange} className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-accent" />
                    <input type="tel" name="phone" placeholder="رقم الهاتف" required value={customerInfo.phone} onChange={handleInputChange} className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-accent" />
                    <input type="text" name="address" placeholder="العنوان بالتفصيل" required value={customerInfo.address} onChange={handleInputChange} className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <button type="submit" className="w-full mt-6 bg-accent text-white font-bold py-3 rounded-lg text-lg hover:bg-red-700 transition-colors duration-300">
                    {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
