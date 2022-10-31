import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./ProductsSlice";
import { addToCart, getTotal } from "../localCart/cartSlice";
import { addToUserCart } from "../userCart/cartForUser";

function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  //we can check if user is logged in by using useSelector
  const { id } = useSelector((state) => state.auth.me);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getTotal());
  }, [dispatch]);

  //if user exist, we dispatch addToUserCart and add it to database, else, we dispatch addToCart which adds product to localstorage
  const handleAddToCart = (product, userId) => {
    if (userId) {
      dispatch(addToUserCart({ product, userId }));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <div id="all-products">
      <h1>All Products: </h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <img src={product.imageUrl} />
            <p>Type: {product.type}</p>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleAddToCart(product, id)}>
              Add To Cart
            </button>
            &nbsp; &nbsp;
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllProducts;
