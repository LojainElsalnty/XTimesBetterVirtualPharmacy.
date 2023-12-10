import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';



// const prescriptionId = '656b5eced6f721891c2f601f'
const MyPCart =  () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { prescriptionId} = useParams();
    //Authenticate part
    const accessToken = sessionStorage.getItem('accessToken');
    const [load, setLoad] = useState(true);
    const [username, setUsername] = useState('');
    
    console.log(accessToken);
    useEffect(() => {
        if (username.length != 0) {
            setLoad(false);
        }
    }, [username]);
    async function checkAuthentication() {
        await axios({
            method: 'get',
            url: 'http://localhost:5000/authentication/checkAccessToken',
            headers: {
                "Content-Type": "application/json",
                'Authorization': accessToken,
                'User-type': 'patient',
            },
        })
            .then((response) => {
                console.log(response);
                setUsername(response.data.username);
                //setLoad(false);
            })
            .catch((error) => {
                //setLoad(false);
                navigate('/login');
  
            });
    }
  
    const xTest = checkAuthentication();
  //Authenticate part
  
    useEffect(() => {
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/patient/myPrescriptionRoute/getPrescriptionById/${prescriptionId}`);
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    // Call the function to fetch cart items
    fetchCartItems();
}, [prescriptionId]);
useEffect(() => {
  // Parse URL parameters and set username and password
  const queryParams = queryString.parse(window.location.search);
  if (queryParams.username && queryParams.password) {
    setUsername(queryParams.username);
    setPassword(queryParams.password);
  }
}, []);
const updateCartItemQuantity = (medName) => {
    // console.log(medName)
     // Send a PUT request to update the quantity of a cart item
     axios.put(`http://localhost:8000/patient/myPrescriptionRoute/updateCartItemQuantity/${medName}`, { medName, cartItems })
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
         sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Added - Nour
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
    axios.put(`http://localhost:8000/patient/myPrescriptionRoute/decrementCartItemQuantity/${medName}`, { medName, cartItems })
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
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Added - Nour
      })
      .catch((error) => {
        console.error('Error decrementing quantity:', error);

        // Check if there is a response from the server
        if (error.response && error.response.status === 400) {
          alert("Bad Request: " + error.response.data.message);
        }
      });
  };

  const deleteMedicineFromPrescription = (medName) => {
    // Send a DELETE request to delete a cart item
    axios.delete(`http://localhost:8000/patient/myPrescriptionRoute/deleteMedicineFromPrescription/${medName}`, { data: { medName, cartItems } })
      .then(() => {
        setCartItems(cartItems.filter((item) => item.medName !== medName));
        console.log("after deletion--", cartItems.filter((item) => item.medName !== medName))
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems.filter((item) => item.medName !== medName))); //Added - Nour
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

 
 
  const redirectToCheckout = async () => {
    try {
      if (cartItems.length <= 0) {
        return alert('Your Cart is Empty!');
      }

      sessionStorage.setItem('cartItems', JSON.stringify(cartItems)); // Added - Nour

      // Navigate to checkout with cartItems, username, and password
      navigate('/patient/checkoutAddress', {
        state: {
          cartItems: cartItems
        },
      });
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
    }
  };

  const redirectToCatalouge = async () => {
    try {
     
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems)); 
      navigate('/patient/medicineCatalog', { state: { cartItems: cartItems } });
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
    }
  };




 

return (
    <div>
        <h2>Cart Items</h2>
        
        <button  onClick={redirectToCatalouge} >back</button>
        <table>
            <thead>
                <tr>
                    <th>Medicine</th>
                    <th>Price per item</th>
                    <th>Quantity</th>
                    <th>Dose</th>
                    
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((item, index) => (
                    <tr key={index}>
                        <td>{item.medName}</td>
                        <td>{item.price_per_item}</td>
                        <td>
                            <button onClick={() => decrementCartItemQuantity(item.medName)}>-</button>
                            {item.quantity}
                            <button onClick={() => updateCartItemQuantity(item.medName)}>+</button>
                        </td>

                        <td>{item.dosage}
                        
                        </td>
                       
                        <td><button onClick={() => deleteMedicineFromPrescription(item.medName)}>Delete</button></td>


                    </tr>
                ))}
            </tbody>
        </table>
        <button  onClick={redirectToCheckout}>CheckOut</button>
        
    </div>
);
};

export default MyPCart;
