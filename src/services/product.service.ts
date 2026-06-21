import { Product } from "../types/product";

type ApiProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};
export async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ApiProduct[] = await response.json();

  return data.map((item) => ({
    id: item.id,
    name: item.title,
    price: item.price,
    description: item.description,
    image: item.image,
    category: item.category,
    reviews: [
      {
        id: 1,
        userName: "Pisey",
        rating: 5,
        comment: "Excellent product",
      },
      {
        id: 2,
        userName: "Reaksa",
        rating: 4,
        comment: "Good quality",
      },
    ],
  }));
}
