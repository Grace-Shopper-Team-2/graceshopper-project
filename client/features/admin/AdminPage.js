import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../allProducts/ProductsSlice";
import { fetchUsers } from "./allUsersSlice";

function AdminPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div id="admin-page">
      <h1>Admin Page</h1>

      <div id="admin-all-products">
        <strong>Edit Products</strong>
        <ol>
          {products.map(
            ({ name, type, price, description, imageUrl, id, quantity }) => (
              <li key={id}>
                <p>
                  {name} || Type: {type} || Price: ${price}
                </p>
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
