import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../ProductsSlice/ProductsSlice";

// o: we can talk about this in our SM but you should be placing this file in 
//  its own feature folder that represents products aka a products feature

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
            <strong>{name}</strong>
            {/* o: keep in mind that there are better ways to space out
            elements than using &nbsp; (by using css) */}
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
