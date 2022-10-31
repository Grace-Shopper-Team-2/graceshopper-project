import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAsync, fetchProducts } from "../allProducts/ProductsSlice";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState(0);

  let newProductData = { name, type, price, description, imageUrl, quantity };

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addProductAsync(newProductData));
    dispatch(fetchProducts())
    setName("");
    setType("");
    setPrice(0);
    setDescription("");
    setImageUrl("");
    setQuantity(0);
    console.log("done")
  };

  return (
    <form id="add-product-form" onSubmit={handleSubmit}>
      <h3>Add New Product:</h3>

      <label htmlFor="productName">
        <strong>Add Name</strong>:
      </label>
      <input
        type="text"
        name="productName"
        value={name}
        onChange={(event) => setName(event.target.value)}
      ></input>
      <label htmlFor="description">
        <strong>Add a Description:</strong>
      </label>
      <textarea
        type="text"
        name="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        rows="5"
        cols="50"
      ></textarea>
      <label htmlFor="imageUrl">
        <strong>Add an ImageUrl:</strong>
      </label>
      <textarea
        type="text"
        name="imageUrl"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
        rows="1"
        cols="70"
      ></textarea>
      <label htmlFor="price">
        <strong>Add Price:</strong>
      </label>
      <input
        type="number"
        name="price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        step="any"
      ></input>
      <label htmlFor="type">
        <strong>Type</strong>
      </label>
      <select
        name="type"
        type="text"
        value={type}
        onChange={(event) => setType(event.target.value)}
      >
        <option value="wand">Wand</option>
      </select>
      <label htmlFor="quantity">
        <strong>Add Quantity:</strong>
      </label>
      <input
        type="number"
        name="quantity"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        step="any"
      ></input>
      <button type="submit">Submit New Item</button>
    </form>
  );
};

export default AddProductForm;
