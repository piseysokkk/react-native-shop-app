import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../types/product";

type WishlistContextType = {
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export function WishlistProvider({ children }: Props) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

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
