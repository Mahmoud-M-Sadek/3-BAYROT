
import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { Order, OrderStatus, MenuItem, Category } from '../types';

const AdminLogin: React.FC<{ onLogin: (password: string) => boolean }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(password)) {
      setError('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          لوحة التحكم - تسجيل الدخول
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-accent mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="w-full bg-accent text-white font-bold py-2 rounded-lg hover:bg-red-700 transition-colors">
            دخول
          </button>
        </form>
      </div>
    </div>
  );
};

// Sub-components for Dashboard
const OrdersManager: React.FC = () => {
    const { orders, updateOrderStatus } = useContext(AppContext);
    
    const statusColor = (status: OrderStatus) => {
        switch(status) {
            case OrderStatus.NEW: return 'bg-blue-500';
            case OrderStatus.IN_PROGRESS: return 'bg-yellow-500';
            case OrderStatus.COMPLETED: return 'bg-green-500';
            case OrderStatus.CANCELLED: return 'bg-red-600';
        }
    }

    return (
        <div className="space-y-4">
            {orders.map(order => (
                <div key={order.id} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-white">طلب رقم: {order.id}</p>
                            <p className="text-gray-300">{order.customerName} - {order.phone}</p>
                            <p className="text-gray-400 text-sm">{order.address}</p>
                            <p className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleString('ar-EG')}</p>
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-accent text-xl">{order.total} جم</p>
                            <span className={`px-3 py-1 text-sm rounded-full text-white ${statusColor(order.status)}`}>{order.status}</span>
                        </div>
                    </div>
                    <div className="mt-4 border-t border-gray-700 pt-2">
                        <p className="font-semibold text-white mb-2">الأصناف:</p>
                        <ul className="list-disc list-inside text-gray-300">
                            {order.items.map(item => <li key={item.itemId}>{item.name} (x{item.quantity})</li>)}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="bg-gray-700 text-white rounded p-2"
                        >
                            {Object.values(OrderStatus).map(status => <option key={status} value={status}>{status}</option>)}
                        </select>
                    </div>
                </div>
            ))}
        </div>
    );
}

const MenuManager: React.FC = () => {
    const { menuItems, categories, addMenuItem, updateMenuItem, deleteMenuItem } = useContext(AppContext);
    const [editingItem, setEditingItem] = useState<MenuItem | Partial<MenuItem> | null>(null);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if(!editingItem) return;

        const itemToSave = {
            name: editingItem.name || '',
            description: editingItem.description || '',
            price: Number(editingItem.price) || 0,
            image: editingItem.image || 'https://picsum.photos/400/300',
            categoryId: Number(editingItem.categoryId) || 0
        };

        if ('id' in editingItem && editingItem.id) {
            updateMenuItem({ ...itemToSave, id: editingItem.id });
        } else {
            addMenuItem(itemToSave);
        }
        setEditingItem(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if(event.target?.result) {
                    setEditingItem(prev => ({...prev!, image: event.target!.result as string}));
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };


    if(editingItem) {
        return (
            <form onSubmit={handleSave} className="bg-gray-800 p-6 rounded-lg space-y-4">
                 <h3 className="text-xl font-bold text-white">{'id' in editingItem ? 'تعديل الصنف' : 'إضافة صنف جديد'}</h3>
                 <input type="text" placeholder="اسم الصنف" value={editingItem.name || ''} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-gray-700 p-2 rounded text-white" required />
                 <textarea placeholder="الوصف" value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="w-full bg-gray-700 p-2 rounded text-white" />
                 <input type="number" placeholder="السعر" value={editingItem.price || ''} onChange={e => setEditingItem({...editingItem, price: Number(e.target.value)})} className="w-full bg-gray-700 p-2 rounded text-white" required />
                 <select value={editingItem.categoryId || ''} onChange={e => setEditingItem({...editingItem, categoryId: Number(e.target.value)})} className="w-full bg-gray-700 p-2 rounded text-white" required>
                     <option value="">اختر القسم</option>
                     {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                 </select>
                 <input type="file" onChange={handleFileChange} className="w-full bg-gray-700 p-2 rounded text-white" />
                 {editingItem.image && <img src={editingItem.image} alt="preview" className="w-24 h-24 object-cover rounded" />}
                 <div className="flex gap-4">
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">حفظ</button>
                    <button type="button" onClick={() => setEditingItem(null)} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">إلغاء</button>
                 </div>
            </form>
        )
    }

    return (
        <div>
            <button onClick={() => setEditingItem({})} className="bg-accent hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4">إضافة صنف جديد</button>
            <div className="space-y-2">
                {menuItems.map(item => (
                    <div key={item.id} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center">
                        <p className="text-white">{item.name} - ({categories.find(c=>c.id === item.categoryId)?.name})</p>
                        <div className="flex gap-2">
                            <button onClick={() => setEditingItem(item)} className="text-yellow-400 hover:text-yellow-300">تعديل</button>
                            <button onClick={() => deleteMenuItem(item.id)} className="text-red-500 hover:text-red-400">حذف</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CategoriesManager: React.FC = () => {
    const { categories, addCategory, updateCategory, deleteCategory } = useContext(AppContext);
    const [name, setName] = useState('');
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const handleSave = () => {
        if(editingCategory) {
            updateCategory(editingCategory.id, name);
        } else {
            addCategory(name);
        }
        setName('');
        setEditingCategory(null);
    }

    const startEditing = (category: Category) => {
        setEditingCategory(category);
        setName(category.name);
    }
    
    return (
        <div>
            <div className="flex gap-2 mb-4">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={editingCategory ? "تعديل اسم القسم" : "إضافة قسم جديد"} className="flex-grow bg-gray-700 p-2 rounded text-white" />
                <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">{editingCategory ? "حفظ التعديل" : "إضافة"}</button>
                {editingCategory && <button onClick={() => { setEditingCategory(null); setName(''); }} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">إلغاء</button>}
            </div>
             <div className="space-y-2">
                {categories.map(cat => (
                    <div key={cat.id} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center">
                        <p className="text-white">{cat.name}</p>
                        <div className="flex gap-2">
                            <button onClick={() => startEditing(cat)} className="text-yellow-400 hover:text-yellow-300">تعديل</button>
                            <button onClick={() => deleteCategory(cat.id)} className="text-red-500 hover:text-red-400">حذف</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const DashboardPage: React.FC = () => {
  const { isLoggedIn, login, logout } = useContext(AppContext);
  const TABS = useMemo(() => ['الطلبات', 'إدارة المنيو', 'إدارة الأقسام'], []);
  const [activeTab, setActiveTab] = useState(TABS[0]);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary p-6 flex flex-col">
        <h1 className="text-2xl font-black text-white mb-8">
             - ع<span className="text-accent">بيروت</span>
        </h1>
        <nav className="flex-grow">
            {TABS.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-right p-3 rounded-lg mb-2 transition-colors ${activeTab === tab ? 'bg-accent' : 'hover:bg-gray-800'}`}
                >
                    {tab}
                </button>
            ))}
        </nav>
        <button onClick={logout} className="w-full p-3 rounded-lg mt-auto bg-red-800 hover:bg-red-700 transition-colors">
            تسجيل الخروج
        </button>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">{activeTab}</h2>
        <div>
            {activeTab === 'الطلبات' && <OrdersManager />}
            {activeTab === 'إدارة المنيو' && <MenuManager />}
            {activeTab === 'إدارة الأقسام' && <CategoriesManager />}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
