import { CartItem } from "./product";

export interface Order {
  id: number;
  items: CartItem[];
  totalPrice: number;
  customerName: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
}
