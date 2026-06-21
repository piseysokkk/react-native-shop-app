import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./src/context/CartContext";
import { OrderProvider } from "./src/context/OrderContext";
import { WishlistProvider } from "./src/context/WishlistContext";
import AppNavigator from "./src/navigation/AppNavigator";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <AppNavigator />
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

