import React, {useState} from 'react';

import { Card, CircularProgress } from '@mui/material';
import { useHttpClient } from '../../hooks/http-hook';

import './ProductItem.css';

const ProductItem = (props) => {
    // just want to fetch, not all crud operations
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
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
          </div>
          
        </Card>
      </li>
    );
}

export default ProductItem;
    