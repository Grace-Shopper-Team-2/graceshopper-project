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
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <strong>{product.name}</strong>
            </Link>
            <br />
            <img src={product.imageUrl} />
            <p>Type: {product.type}</p>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>
              {product.quantity < 6
                ? `Only ${product.quantity} left in stock!`
                : ""}
            </p>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllProducts;
// { name, type, price, description, imageUrl, id, quantity }
