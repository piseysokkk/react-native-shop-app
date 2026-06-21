import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export default function WishlistScreen() {
  const { wishlistItems } = useWishlist();
  const navigation = useNavigation<NavigationProp>();

  if (wishlistItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Wishlist</Text>
        <Text>No wishlist items yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={wishlistItems}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      ListHeaderComponent={<Text style={styles.title}>Wishlist</Text>}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() =>
            navigation.navigate("ProductDetail", {
              product: item,
            })
          }
        />
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
});
