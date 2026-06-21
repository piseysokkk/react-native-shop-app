import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useCart } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CartScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { cartItems, increaseQuantity, decreaseQuantity } = useCart();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cart</Text>
        <Text>Your cart is empty.</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={cartItems}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>Cart</Text>
          <Text style={styles.total}>Total: ${totalPrice}</Text>

          <Pressable
            style={styles.checkoutButton}
            onPress={() => navigation.navigate("Checkout")}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </Pressable>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.cartItem}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>${item.price}</Text>

          <View style={styles.quantityRow}>
            <Pressable
              style={styles.quantityButton}
              onPress={() => decreaseQuantity(item.id)}
            >
              <Text>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Pressable
              style={styles.quantityButton}
              onPress={() => increaseQuantity(item.id)}
            >
              <Text>+</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cartItem: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 18,
    fontWeight: "600",
  },
  checkoutButton: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
