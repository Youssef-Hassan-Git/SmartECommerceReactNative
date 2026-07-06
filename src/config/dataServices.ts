import { collection, doc, getDocs } from "firebase/firestore"
import { auth, db } from "./firebase"
import { store } from "../store/store"

export const getProductsData = async() =>{
    try {
        const querySnapshot = await getDocs(collection(db, "products"))
        const list: any = []
        querySnapshot.forEach((doc) =>{
            list.push(doc.data())
        })

        return list;
    } catch (error) {
        console.log(error, " ,error fetching data");
        
    }
}


export const getUserOrders = async () =>{
    try {
      const userIdFromFirebase = auth.currentUser?.uid
      const userId = store.getState().userSlice.userData?.uid
      if (!userId) throw new Error("User ID not found");
      const userOrderRef = collection(doc(db, "users", userId), "orders");
      const querySnapshot = await getDocs(userOrderRef)
      let orderList: any = [];
      orderList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
        return orderList;
    } catch (error) {
         console.log(error, " ,error fetching data");
       
    }
}