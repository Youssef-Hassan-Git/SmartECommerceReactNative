import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HomeHeader from "../../components/headers/HomeHeader";
import ProductCard from "../../components/cards/ProductCard";
import AppSafeView from "../../components/views/AppSafeView";
import { s, vs } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/reducers/cartSlice";
import { getProductsData } from "../../config/dataServices";
import { CartItem } from "../../interfaces/cartItems";
const Home = () => {


  const [products, setProducts] = useState<CartItem[]>([]);

  const getProducts = async () =>{
    const data = await getProductsData();
    setProducts(data)
  }

  useEffect(() =>{
    getProducts();
  }, [])

  const dispatch = useDispatch()
  return (
    <AppSafeView>
      <HomeHeader />
      <View style={styles.cardContainer}>
        <FlatList
          numColumns={2}
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              imageURL={item.imageURL}
              title={item.title}
              price={item.price}
              addToCart={() => {dispatch(addItemToCart(item))}}
            />
          )}
          contentContainerStyle={{ paddingBottom: vs(65) }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            gap: s(8),
            marginBottom: vs(16),
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </AppSafeView>
  );
};

export default Home;

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: vs(12),
    paddingHorizontal: s(12),
  },
});
