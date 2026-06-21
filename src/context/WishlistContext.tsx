import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../types/product";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type WishlistContextType = {
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);
const WISHLIST_STORAGE_KEY = "SHOP_APP_WISHLIST";

type Props = {
  children: ReactNode;
};

export function WishlistProvider({ children }: Props) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  useEffect(() => {
    async function loadWishlist() {
      const saveWishlist = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);

      if (saveWishlist) {
        setWishlistItems(JSON.parse(saveWishlist));
      }
    }
    loadWishlist();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  function toggleWishlist(product: Product) {
    setWishlistItems((currentItems) => {
      const exists = currentItems.some((item) => item.id === product.id);

      if (exists) {
        return currentItems.filter((item) => item.id !== product.id);
      }

      return [...currentItems, product];
    });
  }

  function isInWishlist(productId: number) {
    return wishlistItems.some((item) => item.id === productId);
  }

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return context;
}
