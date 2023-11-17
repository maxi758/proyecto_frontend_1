import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, Button } from '@mui/material';
import OrderItem from './OrderItem';

import './OrderList.css';

const OrderList = (props) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/products');
  };

  if (props.items.order.products.length === 0) {
    return (
      <div className="order-list center">
        <Card>
          <h2>No hay productos en su carrito, desea agregar?</h2>
          <Button onClick={handleRedirect}>Volver</Button>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
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
        <li><b>Total a Pagar: ${props.items.totalToPay}</b></li>
      </ul>
      <Button onClick={handleRedirect}>Volver</Button>
    </React.Fragment>
  );
};

export default OrderList;
