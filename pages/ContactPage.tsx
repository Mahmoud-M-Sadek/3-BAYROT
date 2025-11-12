
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-primary py-12 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-center mb-12">
          تواصل <span className="text-accent">معنا</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-accent">زورونا أو اتصلوا بنا</h3>
            
            <div className="flex items-start gap-4">
              <ion-icon name="location-outline" class="text-3xl text-accent mt-1"></ion-icon>
              <div>
                <h4 className="font-bold text-xl">العنوان</h4>
                <p className="text-gray-300">123 شارع المطاعم، مدينة نصر، القاهرة، مصر</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ion-icon name="call-outline" class="text-3xl text-accent mt-1"></ion-icon>
              <div>
                <h4 className="font-bold text-xl">رقم الهاتف</h4>
                <p className="text-gray-300" dir="ltr">+20 104 464 4693</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ion-icon name="time-outline" class="text-3xl text-accent mt-1"></ion-icon>
              <div>
                <h4 className="font-bold text-xl">ساعات العمل</h4>
                <p className="text-gray-300">يومياً من 12:00 ظهراً - 2:00 صباحاً</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold text-xl mb-4">تابعنا على</h4>
              <div className="flex space-x-6 space-x-reverse">
                <a href="https://wa.me/201044644693" className="text-gray-300 hover:text-accent transition-colors duration-300">
                  <ion-icon name="logo-whatsapp" class="text-3xl"></ion-icon>
                </a>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors duration-300">
                  <ion-icon name="logo-instagram" class="text-3xl"></ion-icon>
                </a>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors duration-300">
                  <ion-icon name="logo-facebook" class="text-3xl"></ion-icon>
                </a>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.490539937171!2d31.3392473151152!3d30.05148898188001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583e5a5f1f5f3b%3A0x5e9f1f7a5f5f5f3b!2sCity%20Stars%20Mall!5e0!3m2!1sen!2seg!4v1672520847970!5m2!1sen!2seg"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
