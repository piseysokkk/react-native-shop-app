import { CartProvider } from "./src/context/CartContext";
import { OrderProvider } from "./src/context/OrderContext";
import { WishlistProvider } from "./src/context/WishlistContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <OrderProvider>
          <AppNavigator />
        </OrderProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

