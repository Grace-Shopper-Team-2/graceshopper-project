import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../productsSlice/productsSlice";
import { addToCart, getTotal } from "../cartSlice/cartSlice";

function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getTotal());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
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
            <button onClick={() => handleAddToCart(product)}>
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
