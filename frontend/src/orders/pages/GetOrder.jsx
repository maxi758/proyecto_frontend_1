import React, { useEffect, useState, useCallback } from 'react';
import { useHttpClient } from '../../hooks/http-hook';

import { Card, CircularProgress } from '@mui/material';
import OrderList from '../components/OrderList';
import { useParams } from 'react-router-dom';

const Order = () => {
  const orderId = useParams().orderId;
  const [loadedProducts, setLoadedProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchProducts = useCallback(async () => {
    try {
      console.log('fetching order');
      //console.log(`${process.env.REACT_APP_BACKEND_URL}/products`);
      const responseData = await sendRequest(
        `http://localhost:5000/api/orders/${orderId}`
      );
      console.log('Response from fetch', responseData.order.products);
      setLoadedProducts(responseData);
    } catch (err) {
      console.log('Error: ', err);
    }
  }, [sendRequest, orderId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

    const updateOrderHandler = useCallback(() => {
        fetchProducts();
    },[fetchProducts]);

  const removeFromOrderHandler = (productId) => {
    console.log('removing from order', loadedProducts.order.products);
    const updatedProducts = loadedProducts.order.products.filter(
      (product) => product.product._id !== productId
    );
    console.log('updated products', updatedProducts);
    const updateTotal = updatedProducts.reduce((acc, product) => {
      return acc + product.quantity * product.product.price;
    }, 0);
    const updatedOrder = {
      ...loadedProducts,
      totalToPay: updateTotal,
      order: { products: updatedProducts },
    };
    console.log('updated order', updatedOrder);
    setLoadedProducts(updatedOrder);
  };

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <CircularProgress />
        </div>
      )}
      {!isLoading && loadedProducts && (
        <OrderList
          items={loadedProducts}
          onRemoveFromOrder={removeFromOrderHandler}
          onUpdateOrder={updateOrderHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Order;
