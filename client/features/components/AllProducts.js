import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../ProductsSlice/ProductsSlice";

export default function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  console.log(products);

  return (
    <div>
      <h1>All Products: </h1>

      <ul>
        {products.map(({ name, type, price, description, imageUrl, id }) => (
          <li key={id}>
            <h3>All Products</h3>
            <strong>{name}</strong>
            <img src={imageUrl} />
            <p>Type: {type}</p>
            <p>Description: {description}</p>
            <p>Price: {price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
