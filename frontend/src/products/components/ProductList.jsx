import React from 'react';

import { Card, Button, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ProductItem from './ProductItem';

import './ProductList.css';
import { useNavigate } from 'react-router-dom';

const ProductList = (props) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/orders/654878575911775457c8ba13');
  };
  if (props.items.length === 0) {
    return (
      <div className="product-list center">
        <Card>
          <h2>No products found</h2>
          <Button to="/"></Button>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <IconButton color="primary" aria-label="add to shopping cart" onClick={handleRedirect}>
        <AddShoppingCartIcon />
      </IconButton>
      <ul className="product-list">
        {props.items.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            price={product.price}
            name={product.name}
            description={product.description}
            quantity={props.quantity}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ProductList;
