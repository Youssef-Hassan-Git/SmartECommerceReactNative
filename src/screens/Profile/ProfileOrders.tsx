import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { s, vs } from "react-native-size-matters";
import OrdersCard from "../../components/cards/OrdersCard";
import { orders } from "../../data/orders";
import { getUserOrders } from "../../config/dataServices";
import { getDateFromFireStoreTimeStampObject } from "../../helpers/dateTimeHelper";
const ProfileOrders = () => {
  const [userOrders, setUserOrders] = useState<any>([]);
  const fetchOrders = async () => {
    const data = await getUserOrders();
    setUserOrders(data);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={styles.profileSpacing}>
      <FlatList
        data={userOrders}
        keyExtractor={(order) => order.id.toString()}
        renderItem={({ item }) => <OrdersCard {...item} />}
      />
    </View>
  );
};

export default ProfileOrders;

const styles = StyleSheet.create({
  profileSpacing: {
    marginHorizontal: s(12),
    marginVertical: vs(12),
  },
});
