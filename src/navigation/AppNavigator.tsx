import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

import CheckoutSreen from "../screens/CheckoutScreen";
import TabNavigation from "./TabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabNavigation}
          options={{
            headerShown: false,
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
          name="Checkout"
          component={CheckoutSreen}
          options={{
            title: "Checkout",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
