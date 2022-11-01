import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  deleteProductAsync,
} from "../allProducts/ProductsSlice";
import { fetchUsers, deleteUserAsync } from "../admin/allUsersSlice";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductsForm";

function AdminPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductDelete = async (id) => {
    await dispatch(deleteProductAsync(id));
    await dispatch(fetchProducts());
  };

  const handleUserDelete = async (id) => {
    await dispatch(deleteUserAsync(id));
    await dispatch(fetchUsers());
  };

  return (
    <div id="admin-page">
      <h1>Admin Page</h1>

      <div id="admin-all-products">
        <AddProductForm id="add-product-form" />
        <strong>Edit Products</strong>
        <ol>
          {products.map((currentProduct) => (
            <li key={currentProduct.id}>

              <p>
                <strong>Name:</strong> {currentProduct.name}
              </p>
              <p>
                <strong>Description:</strong> {currentProduct.description}
              </p>
              <p>
                <strong>Price:</strong> ${currentProduct.price}
              </p>
              <p>
                <strong>Type:</strong> {currentProduct.type}
              </p>
              <p>
                <strong>Quantity:</strong> {currentProduct.quantity}
              </p>
              <p>
                <strong>ID:</strong> {currentProduct.id}
              </p>
              <img src={currentProduct.imageUrl} width="100" height="100"></img>
              <Link to={`/adminPage/product/${currentProduct.id}`}>
                Edit Product
              </Link>
              <button
                id="delete-button"
                onClick={() => {
                  handleProductDelete(currentProduct.id);
                }}
              >
                Delete Product
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div id="admin-all-users">
        <h1>Users</h1>
        <ol>
          {/* o: you can just do a users?.length here for short and it will check
                users for you before trying to run length */}
          {users && users.length ? (
            users.map((currentUser) => {
              return (
                <li key={currentUser.id}>
                  <p>{currentUser.username}</p>
                  <button
                    id="delete-button"
                    onClick={() => handleUserDelete(currentUser.id)}
                  >
                    Delete User
                  </button>
                </li>
              );
            })
          ) : (
            <li>Loading User</li>
          )}
        </ol>
      </div>
    </div>
  );
}

export default AdminPage;
