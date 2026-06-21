import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import { RootStackParamList } from "../types/navigation";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ReviewCard from "../components/ReviewCart";

type ProductDetailRouteProp = RouteProp<RootStackParamList, "ProductDetail">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProductDetailScreen() {
  const { addToCart, totalQuantity } = useCart();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ProductDetailRouteProp>();
  const { product } = route.params;
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const averageRating =
    product.reviews.reduce((total, review) => total + review.rating, 0) /
    product.reviews.length;
  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product?.image }} style={styles.image} />
      <Text style={styles.cartBadge}>Cart: {totalQuantity}</Text>
      <Text style={styles.name}>{product?.name}</Text>
      <Text style={styles.price}>${product?.price}</Text>
      <Text style={styles.rating}> ⭐ {averageRating.toFixed(1)}</Text>
      <Text style={styles.description}>{product?.description}</Text>
      <Text style={styles.reviewTitle}>Reviews</Text>
      {product.reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
      <Pressable
        style={styles.button}
        onPress={() => {
          addToCart(product);
          setIsAddedToCart(true);
        }}
      >
        <Text style={styles.buttonText}>
          {isAddedToCart ? "Added to Cart" : "Add to Cart"}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Home", { screen: "CartTab" })}
        style={styles.cartButton}
      >
        <Text style={styles.buttonText}>Go to Cart</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  price: {
    fontSize: 20,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 16,
    color: "#666",
  },
  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cartButton: {
    backgroundColor: "#666",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    alignItems: "center",
  },
  cartBadge: {
    alignSelf: "flex-end",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  rating: {
    fontSize: 18,
    marginTop: 10,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
});
