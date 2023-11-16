import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';

import { Card, CircularProgress } from '@mui/material';
import ProductList from '../components/ProductList';

const Products = () => {
    const [loadedProducts, setLoadedProducts] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log("fetching products");
                //console.log(`${process.env.REACT_APP_BACKEND_URL}/products`);
                const responseData = await sendRequest(
                    `http://localhost:5000/api/products`
                );
                console.log('Response from fetch',responseData.products);
                setLoadedProducts(responseData.products);
            } catch (err) {
                console.log('Error: ',err);
            }
        };
        fetchProducts();
    }, [sendRequest]);
    
    return (
        <React.Fragment>
            {isLoading && (
                <div className="center">
                    <CircularProgress />
                </div>
            )}
            {!isLoading && loadedProducts && <ProductList items={loadedProducts} />}
        </React.Fragment>
    );
};

export default Products;