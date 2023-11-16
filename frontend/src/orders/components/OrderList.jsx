import React from "react";

import { Card, Button } from "@mui/material";
import OrderItem from "./OrderItem";


import "./OrderList.css";

const OrderList = (props) => {

  if (props.items.order.products.length === 0) {
    return (
      <div className="order-list center">
        <Card>
          <h2>No products found</h2>
          <Button to='/'>Volver</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="order-list">
      {props.items.order.products.map((product) => (
        <OrderItem
          key={product.product._id}
          id={product.product._id}
          price={product.product.price}
          name={product.product.name}
          description={product.product.description}
          quantity={product.qty}
          onDelete={props.onRemoveFromOrder}
          onUpdate={props.onUpdateOrder}
        />
      ))}
      <li>{props.items.totalToPay}</li>
    </ul>
  );
};

export default OrderList;