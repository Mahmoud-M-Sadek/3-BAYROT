
import { Category, MenuItem } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 1, name: "شاورما" },
  { id: 2, name: "فطائر" },
  { id: 3, name: "مشويات" },
  { id: 4, name: "مشروبات" },
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  { id: 1, name: "شاورما دجاج", description: "قطع دجاج متبلة ومشوية بعناية.", price: 90, image: "https://picsum.photos/id/31/400/300", categoryId: 1 },
  { id: 2, name: "شاورما لحم", description: "شرائح لحم طرية بتتبيلة خاصة.", price: 100, image: "https://picsum.photos/id/32/400/300", categoryId: 1 },
  { id: 3, name: "صحن شاورما عربي", description: "شاورما مقطعة مع بطاطس ومخلل.", price: 120, image: "https://picsum.photos/id/33/400/300", categoryId: 1 },
  { id: 4, name: "فطيرة جبنة", description: "فطيرة هشة محشوة بأجود أنواع الجبن.", price: 50, image: "https://picsum.photos/id/41/400/300", categoryId: 2 },
  { id: 5, name: "فطيرة زعتر", description: "الزعتر الأصلي مع زيت الزيتون البكر.", price: 40, image: "https://picsum.photos/id/42/400/300", categoryId: 2 },
  { id: 6, name: "فطيرة محمرة", description: "مزيج الفلفل الأحمر ودبس الرمان.", price: 45, image: "https://picsum.photos/id/43/400/300", categoryId: 2 },
  { id: 7, name: "كباب لحم", description: "أسياخ كباب لحم غنم طازج.", price: 150, image: "https://picsum.photos/id/51/400/300", categoryId: 3 },
  { id: 8, name: "شيش طاووق", description: "قطع دجاج متبلة ومشوية على الفحم.", price: 130, image: "https://picsum.photos/id/52/400/300", categoryId: 3 },
  { id: 9, name: "عرايس لحم", description: "خبز محشو باللحم المفروم ومشوي.", price: 110, image: "https://picsum.photos/id/53/400/300", categoryId: 3 },
  { id: 10, name: "بيبسي", description: "مشروب غازي منعش.", price: 20, image: "https://picsum.photos/id/61/400/300", categoryId: 4 },
  { id: 11, name: "مياه معدنية", description: "مياه نقية.", price: 10, image: "https://picsum.photos/id/62/400/300", categoryId: 4 },
];
