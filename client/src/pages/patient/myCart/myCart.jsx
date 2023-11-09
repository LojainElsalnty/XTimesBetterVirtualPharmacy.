//import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
//import './styles.css';
import MyCartC from '../../../components/MyCartC';



//import MyCartComponent from '../components/myCart/myCart'; // Import the component from components/myCart


import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styles from './myCartPage.module.css'

const MyCart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.cartItems) {
      // Use a condition to prevent unnecessary updates
      //setCartItems(location.state.cartItems);
      setCartItems(JSON.parse(localStorage.getItem('cartItems'))) //Added-Nour

    }
  }, [location.state]);
  // useEffect(() => {
  //   // Fetch cart items from the backend when the component mounts
  //   axios.get('http://localhost:5000/patient/myCartRoute/viewAllCartItems')
  //     .then((response) => setCartItems(response.data))
  //     .catch((error) => console.error('Error fetching cart items:', error));
  // }, []);



  const updateCartItemQuantity = (medName) => {
    console.log(medName)
    // Send a PUT request to update the quantity of a cart item
    axios.put(`http://localhost:5000/patient/myCartRoute/updateCartItemQuantity/${medName}`, { medName, cartItems })
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
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); //Added - Nour
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
    axios.put(`http://localhost:5000/patient/myCartRoute/decrementCartItemQuantity/${medName}`, { medName, cartItems })
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
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); //Added - Nour
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
    axios.delete(`http://localhost:5000/patient/myCartRoute/deleteCartItem/${medName}`, { data: { medName, cartItems } })
      .then(() => {
        setCartItems((prevItems) => prevItems.filter((item) => item.medName !== medName));
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); //Added - Nour
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  const redirectToCheckout = async () => {
    try {
      if (cartItems.length <= 0) {
        return alert('Your Cart is Empty!')
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems)); //Added - Nour
      navigate('/patient/checkoutAddress', { state: { cartItems: cartItems } })
    } catch (error) {
      console.error('Error retrieving cartItems:', error);
    }
  };



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
              <td><button className={styles["button-delete"]} onClick={() => deleteItem(item.medName)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles["button-checkoutAddress"]} onClick={redirectToCheckout}>CheckOut</button>

    </div>
  );
};

export default MyCart;

