import React from "react";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */

const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);


  return (
    <div>
      <h3>Welcome, {username}</h3>
      <table>
        <tr>
          <th>
            
          </th>
        </tr>

        <tr>
          <td>

          </td>
        </tr>
      </table>
    </div>
  );
};

export default Home;
