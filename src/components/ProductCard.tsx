import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from "../types/product";
import { useWishlist } from "../context/WishlistContext";
type Props = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const liked = isInWishlist(product.id);
  return (
    <Pressable style={styles.productCard} onPress={onPress}>
      <Pressable
        style={styles.heartButton}
        onPress={(event) => {
          event.stopPropagation();
          toggleWishlist(product);
        }}
      >
        <Text style={styles.heartText}> {liked ? "❤️" : "🤍"}</Text>
      </Pressable>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  productCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f5f5f6",
    marginBottom: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 16,
    marginTop: 4,
  },
  productDescription: {
    fontSize: 14,
    marginTop: 6,
    color: "#666",
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  heartButton: {
    position: "absolute",
    top: 24,
    right: 24,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
  },
  heartText: {
    fontSize: 20,
  },
});
