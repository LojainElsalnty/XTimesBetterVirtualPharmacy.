//import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
//import './styles.css';
import MyCartC from '../../../components/MyCartC';
//import styles from '../../components/myCart/myCart.module.css';

//import MyCartComponent from '../components/myCart/myCart'; // Import the component from components/myCart


import axios from 'axios';

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from the backend when the component mounts
    axios.get('http://localhost:5000/patient/myCartRoute/viewAllCartItems')
      .then((response) => setCartItems(response.data))
      .catch((error) => console.error('Error fetching cart items:', error));
  }, []);

  /*const updateQuantity = (medName) => {
    // Send a PUT request to update the quantity of a cart item
    axios.put(`http://localhost:5000/patient/myCartRoute/updateCartItemQuantity/${medName}`)
      .then((response) => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.medName === medName ? { ...item, quantity: response.data.quantity } : item
          )
        );
      })
      .catch((error) => console.error('Error updating quantity:', error));
  };*/
  const updateCartItemQuantity = (medName) => {
    // Send a PUT request to update the quantity of a cart item
    axios.put(`http://localhost:5000/patient/myCartRoute/updateCartItemQuantity/${medName}`)
      .then((response) => {
        // Find the item in your cartItems state by its medName
        const updatedCartItems = cartItems.map((item) => {
          if (item.medName === medName) {
            // Update the quantity of the matching item
            return { ...item, quantity: response.data.quantity };
          }
          return item;
        });

        // Set the state with the updated cart items
        setCartItems(updatedCartItems);
      })
      .catch((error) => {
        console.error('Error updating quantity:', error);

        // Check if there is a response from the server
        if (error.response && error.response.status === 400) {
          alert("Bad Request: " + error.response.data.message);
        }
      });
  };


  const decrementCartItemQuantity = (medName) => {
    // Send a PUT request to decrement the quantity of a cart item
    axios.put(`http://localhost:5000/patient/myCartRoute/decrementCartItemQuantity/${medName}`)
      .then((response) => {
        // Find the item in your cartItems state by its medName
        const updatedCartItems = cartItems.map((item) => {
          if (item.medName === medName) {
            // Update the quantity of the matching item
            return { ...item, quantity: response.data.quantity };
          }
          return item;
        });

        // Set the state with the updated cart items
        setCartItems(updatedCartItems);
      })
      .catch((error) => {
        console.error('Error decrementing quantity:', error);

        // Check if there is a response from the server
        if (error.response && error.response.status === 400) {
          alert("Bad Request: " + error.response.data.message);
        }
      });
  };



  const deleteItem = (medName) => {
    // Send a DELETE request to delete a cart item
    axios.delete(`http://localhost:5000/patient/myCartRoute/deleteCartItem/${medName}`)
      .then(() => {
        setCartItems((prevItems) => prevItems.filter((item) => item.medName !== medName));
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  /*const redirectToFriendPage = async () => {
    try {
      // Fetch cartItems from your own backend's viewCart endpoint
      const response = await axios.get('/viewCart');

      // Extract cartItems from the response
      const cartItems = response.data.cartItems;

      // Redirect to your friend's page and pass cartItems
      window.location.href =  /friendPage b /patient/checkoutAddress?cartItems=${JSON.stringify(cartItems)};
    } catch (error) {
      console.error('Error retrieving cartItems:', error);
    }
  };*/



  return (
    <div className="App">
      <h1>Cart Items</h1>
      <table>
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Quantity</th>
            <th>Price/Item</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.medName}</td>
              <td>
                <button onClick={() => decrementCartItemQuantity(item.medName)}>-</button>
                {item.quantity}
                <button onClick={() => updateCartItemQuantity(item.medName)}>+</button>

              </td>
              <td>{item.price_per_item}</td>
              <td><button onClick={() => deleteItem(item.medName)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
};

export default MyCart;
/*<button onClick={redirectToFriendPage}>CheckOut</button>*/
