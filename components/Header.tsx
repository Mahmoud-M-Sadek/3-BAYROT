
import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useContext(AppContext);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-bold transition-colors duration-300 ${
      isActive ? 'bg-accent text-white' : 'text-white hover:bg-red-900'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 rounded-md text-base font-bold transition-colors duration-300 ${
      isActive ? 'bg-accent text-white' : 'text-white hover:bg-red-900'
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>الرئيسية</NavLink>
      <NavLink to="/menu" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>المنيو</NavLink>
      <NavLink to="/about" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>من نحن</NavLink>
      <NavLink to="/contact" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>تواصل معنا</NavLink>
    </>
  );
  
  const mobileNavLinks = (
    <>
      <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>الرئيسية</NavLink>
      <NavLink to="/menu" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>المنيو</NavLink>
      <NavLink to="/about" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>من نحن</NavLink>
      <NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>تواصل معنا</NavLink>
    </>
  );

  return (
    <header className="bg-primary sticky top-0 z-50 shadow-lg shadow-accent/20">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-black text-white">
            ع- <span className="text-accent">بيروت</span>
          </NavLink>

          <div className="hidden md:flex items-center space-x-reverse space-x-4">
            {navLinks}
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <NavLink to="/cart" className="relative text-white hover:text-accent transition-colors">
              <ion-icon name="cart-outline" class="text-3xl"></ion-icon>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </NavLink>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                <ion-icon name={isMenuOpen ? "close-outline" : "menu-outline"} class="text-3xl"></ion-icon>
              </button>
            </div>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {mobileNavLinks}
          </div>
        )}
      </nav>
    </header>
  );
};
