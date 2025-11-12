
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Category, MenuItem, CartItem, Order, OrderStatus } from '../types';
import { INITIAL_CATEGORIES, INITIAL_MENU_ITEMS } from '../constants';

interface AppContextType {
  categories: Category[];
  menuItems: MenuItem[];
  cart: CartItem[];
  orders: Order[];
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  addToCart: (item: MenuItem) => void;
  updateCartQuantity: (itemId: number, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  placeOrder: (customer: { name: string; phone: string; address: string }) => void;
  addCategory: (name: string) => void;
  updateCategory: (id: number, name: string) => void;
  deleteCategory: (id: number) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: number) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const defaultState: AppContextType = {
  categories: [],
  menuItems: [],
  cart: [],
  orders: [],
  isLoggedIn: false,
  login: () => false,
  logout: () => {},
  addToCart: () => {},
  updateCartQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  placeOrder: () => {},
  addCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
  addMenuItem: () => {},
  updateMenuItem: () => {},
  deleteMenuItem: () => {},
  updateOrderStatus: () => {},
};

export const AppContext = createContext<AppContextType>(defaultState);

const getInitialState = <T,>(key: string, fallback: T): T => {
  const stored = localStorage.getItem(key);
  try {
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return fallback;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(() => getInitialState('categories', INITIAL_CATEGORIES));
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => getInitialState('menuItems', INITIAL_MENU_ITEMS));
  const [cart, setCart] = useState<CartItem[]>(() => getInitialState('cart', []));
  const [orders, setOrders] = useState<Order[]>(() => getInitialState('orders', []));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => getInitialState('isLoggedIn', false));

  useEffect(() => { localStorage.setItem('categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('menuItems', JSON.stringify(menuItems)); }, [menuItems]);
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn)); }, [isLoggedIn]);

  const login = (password: string) => {
    if (password === 'admin123') { // Simple hardcoded password
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };
  const logout = () => setIsLoggedIn(false);

  const addToCart = (itemToAdd: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...itemToAdd, quantity: 1 }];
    });
  };

  const updateCartQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => (item.id === itemId ? { ...item, quantity } : item)));
    }
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };
  
  const clearCart = () => setCart([]);

  const placeOrder = (customer: { name: string; phone: string; address: string }) => {
    const newOrder: Order = {
      id: new Date().getTime().toString(),
      customerName: customer.name,
      phone: customer.phone,
      address: customer.address,
      items: cart.map(item => ({ itemId: item.id, quantity: item.quantity, name: item.name, price: item.price })),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: OrderStatus.NEW,
      createdAt: new Date().toISOString(),
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart();
  };
  
  const addCategory = (name: string) => {
    const newCategory: Category = { id: Date.now(), name };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: number, name: string) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, name } : c));
  };
  
  const deleteCategory = (id: number) => {
    if (menuItems.some(item => item.categoryId === id)) {
        alert("لا يمكن حذف قسم يحتوي على منتجات.");
        return;
    }
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newMenuItem: MenuItem = { ...item, id: Date.now() };
    setMenuItems(prev => [...prev, newMenuItem]);
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems(prev => prev.map(i => i.id === item.id ? item : i));
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems(prev => prev.filter(i => i.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order => (order.id === orderId ? { ...order, status } : order))
    );
  };


  return (
    <AppContext.Provider value={{
      categories, menuItems, cart, orders, isLoggedIn, login, logout,
      addToCart, updateCartQuantity, removeFromCart, clearCart, placeOrder,
      addCategory, updateCategory, deleteCategory,
      addMenuItem, updateMenuItem, deleteMenuItem,
      updateOrderStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};
