import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAsync } from "../allProducts/ProductsSlice";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  selectSingleProduct,
  fetchSingleProduct,
} from "../singleProducts/SingleProductsSlice";

const EditProductForm = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch]);

  // o: destructuring singleProduct would help readability in this component
  let singleProduct = useSelector(selectSingleProduct);
  
  // o: if you destructure singleProduct above you can just do:
  // let productData = { id, name, description, imageUrl, price } for short
  // which you can probably just pass directly into line 34
  let productData = {
    id: singleProduct.id,
    name: singleProduct.name,
    description: singleProduct.description,
    imageUrl: singleProduct.imageUrl,
    price: singleProduct.price,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(updateProductAsync(productData));
    // o: I know this is commented out but you can avoid this by passing in productId
    //  to the useEffect hook as a dependancy (in the array on line 17)
    // await dispatch(fetchSingleProduct(productId));
    navigate("/adminPage");
  };

  return (
    <div id="edit-products">
      <h1>Hello</h1>
      <Link to="/adminPage">Back to Admin Page</Link>
      <h3>Current Information:</h3>
      <p>
        <strong>Name:</strong> {singleProduct.name}
      </p>
      <p>
        <strong>Description:</strong> {singleProduct.description}
      </p>
      <p>
        <strong>Price:</strong> ${singleProduct.price}
      </p>
      <p>
        <strong>Type:</strong> {singleProduct.type}
      </p>
      <img src={singleProduct.imageUrl} width="100" height="100"></img>

      <form id="product-form" onSubmit={handleSubmit}>
        <h3>Edit Information:</h3>

        <label htmlFor="productName">
          <strong>Edit Name</strong>:
        </label>
        <input
          type="text"
          name="productName"
          placeholder={singleProduct.name}
          onChange={(event) => (productData.name = event.target.value)}
        ></input>
        <label htmlFor="description">
          <strong>Edit Description:</strong>
        </label>
        <textarea
          type="text"
          name="description"
          placeHolder={singleProduct.description}
          onChange={(event) => (productData.description = event.target.value)}
          rows="5"
          cols="50"
        ></textarea>
        <label htmlFor="imageUrl">
          <strong>Edit ImageUrl:</strong>
        </label>
        <textarea
          type="text"
          name="imageUrl"
          placeHolder={singleProduct.imageUrl}
          onChange={(event) => (productData.imageUrl = event.target.value)}
          rows="1"
          cols="70"
        ></textarea>
        <label htmlFor="price">
          <strong>Edit Price:</strong>
        </label>
        <input
          type="number"
          name="price"
          placeHolder={singleProduct.price}
          onChange={(event) => (productData.price = event.target.value)}
          step="any"
        ></input>
        <label htmlFor="type">
          <strong>Type</strong>
        </label>
        <select
          name="type"
          onChange={(event) => (productData.type = event.target.value)}
        >
          <option value="wand">Wand</option>
        </select>
        <button type="submit">Submit Changes</button>
      </form>
    </div>
  );
};

export default EditProductForm;
