import React, { useState } from 'react';

import { Button, Card, CircularProgress, Container, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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
  const orderId = localStorage.getItem('orderId');

  const removeFromOrder = async (props) => {
    try {
      console.log('removing from cart', props);

      const responseData = await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/orders/${orderId}/products/${props.id}`,
        'DELETE'
      );
      console.log('Response from fetch', responseData);
      props.onDelete(props.id);
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  const updateOrder = async (item, isAdding = true) => {
    try {
      console.log('updating cart');
      if (isAdding) {
        item.quantity += 1;
      } else {
        item.quantity -= 1;
      }
      const responseData = await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/orders/${orderId}`,
        'PATCH',
        JSON.stringify({
          products: [{ product: item.id, qty: item.quantity }],
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      console.log('Response from fetch', responseData);
      setItem({ ...item, quantity: item.quantity });
      item.onUpdate();
      // setLoadedProducts(responseData.products);
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  if (orderId === null) {
    return (
      <div className="center">
        <Card>
          <h2>No se pudo encontrar la orden</h2>
        </Card>
      </div>
    );
  }

  return (
    <li className="order-item">
      <Card className="order-item__content">
        {/* {isLoading && <CircularProgress asOverlay />} */}
        {/* <div className="order-item__image">
            <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title} />
          </div> */}
        <div className="order-item__info">
          <h2>{item.name}</h2>
          <h3>${item.price}</h3>
          <p>{item.description}</p>
          <p>Subtotal: ${item.quantity * item.price}</p>
        </div>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
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
            {isLoading ? (
              <CircularProgress size={20} /> // Show CircularProgress while loading
            ) : (
              <p>{item.quantity}</p>
            )}
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => updateOrder(item)}
            >
              +
            </Button>
            <IconButton aria-label="delete" onClick={() => removeFromOrder(props)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Container>
      </Card>
    </li>
  );
};

export default OrderItem;
