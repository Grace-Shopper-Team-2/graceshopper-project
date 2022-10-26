import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../ProductsSlice/ProductsSlice';
export default function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>All Products: </h1>

      <ul>
        {products.map(({ name, type, price, description, imageUrl, id }) => (
          <li key={id}>
            <Link to={`/products/${id}`}>
              <strong>{name}</strong>
            </Link>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <img src={imageUrl} />
            <p>Type: {type}</p>
            <p>Description: {description}</p>
            <p>Price: ${price}</p>
            &nbsp; &nbsp;
          </li>
        ))}
      </ul>
    </div>
  );
}
