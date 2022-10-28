import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../ProductsSlice/ProductsSlice";

function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div id="all-products">
      <h1>All Products: </h1>
      <ul>
        {products.map(
          ({ name, type, price, description, imageUrl, id, quantity }) => (
            <li key={id}>
              <Link to={`/products/${id}`}>
                <strong>{name}</strong>
              </Link>
              <br />
              <img src={imageUrl} />
              <p>Type: {type}</p>
              <p>Description: {description}</p>
              <p>Price: ${price}</p>
              <p>{quantity < 6 ? `Only ${quantity} left in stock!` : ""}</p>
              <br />
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default AllProducts;
