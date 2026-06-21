import { Product } from "./product";

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: {
    product: Product;
  };
  Cart: undefined;
  Checkout: undefined;
  Wishlist: undefined;
  OrderHistory: undefined;
};
