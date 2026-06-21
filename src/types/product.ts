import { Review } from "./review";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  reviews: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}
