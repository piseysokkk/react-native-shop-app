import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";

export default function CheckoutSreen() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrders();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function handlePlaceOrder() {
    if (!fullName || !phoneNumber || !address) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      totalPrice,
      customerName: fullName,
      phoneNumber,
      address,
      createdAt: new Date().toLocaleString(),
    };
    addOrder(newOrder);
    clearCart();
    Alert.alert("Success", "Your order has been placed!");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={[styles.input, styles.addressInput]}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        multiline
      />
      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.summaryRow}>
            <Text>
              {item.name} x {item.quantity}
            </Text>
            <Text>${item.price * item.quantity}</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>${totalPrice}</Text>
        </View>
      </View>
      <Pressable style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </Pressable>
    </View>
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },
  addressInput: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  summaryBox: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
