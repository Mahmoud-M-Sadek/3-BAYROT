import React from "react";
import { IonIcon } from "@ionic/react";
import { logoWhatsapp, logoInstagram, logoFacebook } from "ionicons/icons";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-black text-white">
            ع- <span className="text-accent">بيروت</span>
          </h2>
          <p className="max-w-md mx-auto mt-4 text-gray-400">
            أشهى الشاورما والمأكولات الشرقية على أصولها.
          </p>
          <div className="flex justify-center mt-6 space-x-4 space-x-reverse">
            <a
              href="https://wa.me/201044644693"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition-colors duration-300"
            >
              <IonIcon icon={logoWhatsapp} className="text-3xl" />
            </a>

            <a
              href="http://instagram.com/3beirut.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
            >
              <IonIcon icon={logoInstagram} className="text-3xl" />
            </a>

            <a
              href="https://www.facebook.com/3Beirut.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
            >
              <IonIcon icon={logoFacebook} className="text-3xl" />
            </a>
          </div>
        </div>

        <hr className="my-6 border-gray-800" />
        <div className="text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} مطعم ع-بيروت. جميع الحقوق
            محفوظة.
          </p>
          <p>&copy; 2025 . تم تصميم الموقع بواسطة <a href="https://wa.me/201030417663" target="_blank">info system scurity</a></p>

        </div>
      </div>
    </footer>
  );
};
