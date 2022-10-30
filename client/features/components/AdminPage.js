import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  deleteProductAsync,
} from "../ProductsSlice/ProductsSlice";
import { fetchUsers, deleteUserAsync } from "../UserSlice/allUsersSlice";
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
        <strong>Edit Products</strong>
        <ol>
          {products.map(
            (currentProduct) => (
              <li key={currentProduct.id}>

                <EditProductForm product = {currentProduct}/>
                <p>
                  {currentProduct.name} || Type: {currentProduct.type} || Price: ${currentProduct.price}
                </p>
                <p>{currentProduct.description}</p>
                <button
                  id="delete-button"
                  onClick={() => {
                    handleProductDelete(currentProduct.id);
                  }}
                >
                  Delete Product
                </button>
              </li>
            )
          )}
        </ol>
      </div>

      <div id="admin-all-users">
        <h1>Users</h1>
        <ol>
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
