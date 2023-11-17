import { createContext } from "react";

export const Context = createContext({
    orderId: null,
    setOrderId: (orderId) => {
        localStorage.setItem("orderId", orderId);
    },
});
