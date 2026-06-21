import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ProductCard from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { getProducts } from "../services/product.service";
import { Product } from "../types/product";

import { RootStackParamList } from "../types/navigation";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const categories = [
    "All",
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product?.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  async function loadProducts() {
    try {
      setError("");
      const data = await getProducts();
      setProducts(data);
    } catch {
      setError("Failed to laod products");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleRefresh() {
    setIsRefreshing(true);

    await loadProducts();

    setIsRefreshing(false);
  }
  if (isLoading) {
    return <Text>Loading products...</Text>;
  }
  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <FlatList
      data={filteredProducts}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      keyExtractor={(product) => product.id.toString()}
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
      ListHeaderComponent={
        <>
          <Text style={styles.title}>Shop App</Text>
          <Pressable
            style={styles.wishlistButton}
            onPress={() => navigation.navigate("Wishlist")}
          >
            <Text style={styles.wishlistButtonText}>View Wishlist ❤️</Text>
          </Pressable>
          <Pressable
            style={styles.historyButton}
            onPress={() => navigation.navigate("OrderHistory")}
          >
            <Text style={styles.historyButtonText}>Order History</Text>
          </Pressable>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryRow}
          >
            {categories.map((categorie) => (
              <Pressable
                key={categorie}
                style={[
                  styles.categoryButton,
                  selectedCategory === categorie && styles.activeCategoryButton,
                ]}
                onPress={() => setSelectedCategory(categorie)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === categorie && styles.activeCategoryText,
                  ]}
                >
                  {categorie}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </>
      }
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
  },
  categoryRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 8,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  activeCategoryButton: {
    backgroundColor: "#000",
  },
  categoryText: {
    color: "#000",
  },
  activeCategoryText: {
    color: "#fff",
  },
  wishlistButton: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  wishlistButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  historyButton: {
    backgroundColor: "#666",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  historyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
