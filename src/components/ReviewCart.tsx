import { StyleSheet, Text, View } from "react-native";
import { Review } from "../types/review";

type Props = {
  review: Review;
};

export default function ReviewCard({ review }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{review.userName}</Text>
      <Text>⭐ {review.rating}</Text>
      <Text style={styles.comment}>{review.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  name: {
    fontWeight: "bold",
  },
  comment: {
    marginTop: 8,
  },
});
