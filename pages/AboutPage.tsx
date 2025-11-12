import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-primary py-12 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-center mb-8">
          عن <span className="text-accent">ع-بيروت</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://picsum.photos/id/1078/600/400"
              alt="Beirut Restaurant Interior"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-accent">حكايتنا</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              تأسس مطعم ع-بيروت من شغفنا بالمطبخ اللبناني الأصيل ورغبتنا في تقديم نكهات بيروت العريقة إلى قلب مدينتكم. نحن نؤمن بأن الطعام هو لغة تجمع الناس، ولذلك نحرص على استخدام أفضل المكونات الطازجة والتوابل الأصلية لتحضير أطباق لا تُنسى.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              من الشاورما الشهية المحضرة على السيخ، إلى المشويات المتبلة بعناية، والفطائر الطازجة من الفرن، كل طبق لدينا يروي قصة من التراث والذوق الرفيع. فريقنا من الطهاة المهرة يعمل بكل حب لضمان تجربة طعام استثنائية في كل مرة تزورنا فيها.
            </p>
          </div>
        </div>

        <div className="mt-20">
             <h3 className="text-3xl font-bold text-accent text-center mb-8">جاليري الصور</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <img src="https://picsum.photos/id/211/500/350" alt="Food plate" className="rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"/>
                <img src="https://picsum.photos/id/212/500/350" alt="Restaurant atmosphere" className="rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"/>
                <img src="https://picsum.photos/id/213/500/350" alt="Chef preparing food" className="rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"/>
             </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
