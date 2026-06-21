import { FlatList, StyleSheet, Text, View } from "react-native";
import { useOrders } from "../context/OrderContext";

export default function OrderHistoryScreen() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Order History</Text>
        <Text>No orders yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(order) => order.id.toString()}
      contentContainerStyle={styles.container}
      ListHeaderComponent={<Text style={styles.title}>Order History</Text>}
      renderItem={({ item }) => (
        <View style={styles.orderCard}>
          <Text style={styles.orderTitle}>Order #{item.id}</Text>
          <Text>Date: {item.createdAt}</Text>
          <Text>Customer: {item.customerName}</Text>
          <Text>Total: ${item.totalPrice}</Text>

          <Text style={styles.itemsTitle}>Item: </Text>
          {item.items.map((product) => (
            <Text key={product.id}>
              {product.name} x {product.quantity}
            </Text>
          ))}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  orderCard: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  itemsTitle: {
    marginTop: 12,
    fontWeight: "600",
  },
});
