import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProductAsync } from "../ProductsSlice/ProductsSlice";
import { fetchProducts } from "../ProductsSlice/ProductsSlice";

const EditProductForm = (props) => {
  const id = props.product.id
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  let productData = { id, name };
  // console.log("ID:", props.product.id)

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateProductAsync(productData));
    setName("");
  };

  return (
    <form id="product-form" onSubmit={handleSubmit}>
      <p>Edit Information:</p>
      <label htmlFor="productName">Name:</label>
      <input
        type="text"
        name="productName"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">Submit Changes</button>
    </form>
  );
};

export default EditProductForm;
