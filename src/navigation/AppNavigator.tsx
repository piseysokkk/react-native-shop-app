import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutSreen from "../screens/CheckoutScreen";
import WishlistScreen from "../screens/WishlistScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Shop",
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{
            title: "Product Detail",
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            title: "Cart",
          }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutSreen}
          options={{
            title: "Checkout",
          }}
        />
        <Stack.Screen
          name="Wishlist"
          component={WishlistScreen}
          options={{ title: "Wishlist" }}
        />
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistoryScreen}
          options={{ title: "Order History" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
