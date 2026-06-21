import { createContext, ReactNode, useContext, useState } from "react";
import { Order } from "../types/order";

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function OrderProvider({ children }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);

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
