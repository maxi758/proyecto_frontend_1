import React, { useState } from 'react';

import { Button, Card, CircularProgress, Container } from '@mui/material';
import { useHttpClient } from '../../hooks/http-hook';

import './OrderItem.css';

const OrderItem = (props) => {
  // just want to fetch, not all crud operations
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [item, setItem] = useState({
    id: props.id,
    name: props.name,
    price: props.price,
    quantity: props.quantity,
    onDelete: props.onDelete,
    onUpdate: props.onUpdate,
  });

  const addToCart = async (item) => {
    try {
      console.log('adding to cart');
      const responseData = await sendRequest(
        `http://localhost:5000/api/cart/add`,
        'POST',
        JSON.stringify({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      console.log('Response from fetch', responseData);
      // setLoadedProducts(responseData.products);
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  const removeFromOrder = async(props) => {
    try {
      console.log('removing from cart', props);

      const responseData = await sendRequest(
        `http://localhost:5000/api/orders/654878575911775457c8ba13/products/${props.id}`,
        'DELETE'       
      );
      console.log('Response from fetch', responseData);
      props.onDelete(item.id);
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  const updateOrder = async (item, isAdding=true) => {
    try {
      console.log('updating cart');
      if (isAdding) {
        item.quantity += 1;
      } else {
        item.quantity -= 1;
      }
      const responseData = await sendRequest(
        `http://localhost:5000/api/orders/654878575911775457c8ba13`,
        'PATCH',
        JSON.stringify({
          products: [{product: item.id, qty: item.quantity}]
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      console.log('Response from fetch', responseData);
      setItem({...item, quantity: item.quantity});
      item.onUpdate();
      // setLoadedProducts(responseData.products);
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  return (
    <li className="order-item">
      <Card className="order-item__content">
        {isLoading &&<CircularProgress asOverlay />}
        {/* <div className="order-item__image">
            <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title} />
          </div> */}
        <div className="order-item__info">
          <h2>{item.name}</h2>
          <h3>${item.price}</h3>
          <p>{item.description}</p>
          <p>Total: {item.quantity * item.price}</p>
        </div>
        <Container sx={{display: 'flex', justifyContent:'center'}}>
          <div className="buttons">
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => {
                if (item.quantity === 1) {
                  removeFromOrder(props); 
                } else {
                  updateOrder(item, false);
                }
              }}
            >
              -
            </Button>
            <p>{item.quantity}</p>
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => updateOrder(item)}
            >
              +
            </Button>
          </div>
        </Container>
      </Card>
    </li>
  );
};

export default OrderItem;
