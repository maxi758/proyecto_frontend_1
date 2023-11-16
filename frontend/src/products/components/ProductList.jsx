import React from "react";

import { Card, Button } from "@mui/material";
import ProductItem from "./ProductItem";


import "./ProductList.css";

const ProductList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="product-list center">
        <Card>
          <h2>No products found</h2>
          <Button to='/'></Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="product-list">
      {props.items.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          price={product.price}
          name={product.name}
          description={product.description}
        />
      ))}
    </ul>
  );
};

export default ProductList;