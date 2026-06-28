import { Product } from "./product";
import { NavigatorScreenParams } from "@react-navigation/native";
export type TabParamList = {
  HomeTab: undefined;
  WishlistTab: undefined;
  CartTab: undefined;
  OrdersTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: NavigatorScreenParams<TabParamList>;
  ProductDetail: {
    product: Product;
  };
  Checkout: undefined;
};
