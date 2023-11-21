import React, { useState } from 'react';

import { Button, Card, CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useHttpClient } from '../../hooks/http-hook';

import './ProductItem.css';

const ProductItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [item, setItem] = useState({
    id: props.id,
    name: props.name,
    price: props.price,
    quantity: props.quantity,
  });
  const orderId = localStorage.getItem('orderId');

  const createOrder = async (item) => {
    try {
      const responseData = await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/orders/products`,
        'POST',
        JSON.stringify({
          products: [{ product: item.id, qty: item.quantity || 1 }],
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      console.log('Response from fetch', responseData);

      localStorage.setItem('orderId', responseData.order._id);
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  const addToCart = async (item) => {
    try {
      console.log('adding to cart');
      if (!orderId) {
        await createOrder(item);
        return;
      }
      const responseData = await sendRequest(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }/orders/${orderId}/products`,
        'PATCH',
        JSON.stringify({
          products: [{ product: item.id, qty: item.quantity || 1 }],
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
  };

  return (
    <li className="product-item">
      <Card className="product-item__content">
        {isLoading && <CircularProgress asOverlay />}
        {/* <div className="product-item__image">
            <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title} />
          </div> */}
        <div className="product-item__info">
          <h2>{props.name}</h2>
          <h3>${props.price}</h3>
          <p>{props.description}</p>
          <form action="">
            <TextField
              type="number"
              size="small"
              margin="normal"
              name="quantity"
              id="quantity"
              InputProps={{
                inputProps: { 
                    max: 10, min: 1
                }
            }}
              defaultValue="1"
              onChange={(event) => {
                const updatedQuantity = parseInt(event.target.value);
                item.quantity = updatedQuantity;
              }}
            />
          </form>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            Agregar al carrito
          </Button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
