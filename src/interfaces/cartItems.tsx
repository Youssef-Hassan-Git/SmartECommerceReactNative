export interface CartItem {
    id: number;
    price: number;
    title: string;
    imageURL: string;

    qty: number;
    sum: number;
}
export interface CartState {
    cartItems: CartItem[];
}