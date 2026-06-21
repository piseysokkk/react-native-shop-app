import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { Order } from "../types/order";
import AsyncStorage from "@react-native-async-storage/async-storage";

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
};

const ORDERS_STORAGE_KEY = "SHOP_APP_ORDERS";
const OrderContext = createContext<OrderContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function OrderProvider({ children }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function loadOrders() {
      const saveOrders = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);

      if (saveOrders) {
        setOrders(JSON.parse(saveOrders));
      }
    }
    loadOrders();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  function addOrder(order: Order) {
    setOrders((currentOrders) => [order, ...currentOrders]);
  }
  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrders must be used inside OrderProvider");
  }
  return context;
}
