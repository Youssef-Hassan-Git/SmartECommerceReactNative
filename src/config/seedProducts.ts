import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { products } from "../data/products";

export const seedProducts = async () => {
  console.log("Seed started");

  try {
    for (const product of products) {
      console.log("Uploading:", product.title);

      await setDoc(
        doc(db, "products", product.id.toString()),
        product
      );
    }

    console.log("✅ Finished uploading");
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
};