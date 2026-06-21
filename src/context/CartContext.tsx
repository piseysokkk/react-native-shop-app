import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem, Product } from "../types/product";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_STORAGE_KEY = "SHOP_APP_CART";
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  totalQuantity: number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function CartProvider({ children }: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    async function loadCart() {
      const saveCart = await AsyncStorage.getItem(CART_STORAGE_KEY);

      if (saveCart) {
        setCartItems(JSON.parse(saveCart));
      }
    }
    loadCart();
  }, []);
  useEffect(() => {
    AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  function increaseQuantity(productId: number) {
    setCartItems((items) =>
      items.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }
  function decreaseQuantity(productId: number) {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }
  function clearCart() {
    setCartItems([]);
  }
  function addToCart(product: Product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  }
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        totalQuantity,
        clearCart() {},
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
