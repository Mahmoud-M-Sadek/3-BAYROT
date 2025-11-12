// Fix: Add TypeScript definition for the <ion-icon> custom element to resolve JSX errors.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': {
        name: string;
        class?: string;
      };
    }
  }
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export enum OrderStatus {
  NEW = 'جديد',
  IN_PROGRESS = 'جاري التحضير',
  COMPLETED = 'مكتمل',
  CANCELLED = 'ملغي',
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: { itemId: number; quantity: number; name: string; price: number }[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}
