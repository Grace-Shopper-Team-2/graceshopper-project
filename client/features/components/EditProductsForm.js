import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAsync } from "../ProductsSlice/ProductsSlice";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  selectSingleProduct,
  fetchSingleProduct,
} from "../ProductsSlice/SingleProductsSlice";


const EditProductForm = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const singleProduct = useSelector(selectSingleProduct);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch]);

  let productData = {
    id: singleProduct.id,
    name: singleProduct.name,
    description: singleProduct.description,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(updateProductAsync(productData));
    await dispatch(fetchSingleProduct(productId));
  };

  const adminPage = () => {
    navigate("/adminPage");
  };

  return (
    <div id="edit-products">
      <h1>Hello</h1>
      <Link to="/adminPage" onClick={adminPage}>
        Back to Admin Page
      </Link>
      <p>{singleProduct.name}</p>
      <p>{singleProduct.description}</p>

      <form id="product-form" onSubmit={handleSubmit}>
        <p>Edit Information:</p>

        <label htmlFor="productName">Name:</label>
        <input
          type="text"
          name="productName"
          defaultValue={singleProduct.name}
          onChange={(event) => (productData.name = event.target.value)}
        ></input>
        <textarea
          type="text"
          name="description"
          defaultValue={singleProduct.description}
          onChange={(event) => (productData.description = event.target.value)}
          rows="5"
          cols="50"
        ></textarea>
        <button type="submit">Submit Changes</button>
      </form>
    </div>
  );
};

export default EditProductForm;
