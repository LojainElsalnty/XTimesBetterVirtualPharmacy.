import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './checkoutAddressPage.module.css';

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CheckoutAddress = () => {
    const navigate = useNavigate();

    // existing address related
    const [existingAddresses, setExistingAddresses] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    // new part
    const accessToken = sessionStorage.getItem('accessToken');
    const [load, setLoad] = useState(true);
    const [username, setUsername] = useState('');

    console.log(accessToken);

    useEffect(() => {
        if (username.length !== 0) {
            setLoad(false);
        }
    }, [username]);

    async function checkAuthentication() {
        await axios({
            method: 'get',
            url: 'http://localhost:8000/authentication/checkAccessToken',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
                'User-type': 'patient',
            },
        })
            .then((response) => {
                console.log(response);
                setUsername(response.data.username);
            })
            .catch(() => {
                navigate('/login');
            });
    }

    const xTest = checkAuthentication();

    useEffect(() => {
        const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems'));

        if (storedCartItems) {
            setCartItems(storedCartItems);
            console.log('CartItems:', storedCartItems);
            // Fetch discounted prices based on stored cart items
            const fetchDiscountedPrices = async () => {
                try {
                    const response = await axios.post(
                        'http://localhost:8000/patient/checkoutAddress/medicineDiscount',
                        {
                            cartItems: storedCartItems,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': accessToken,
                            },
                        }
                    );

                    setDiscountedCartItems(response.data);
                } catch (error) {
                    console.error('Error fetching discounted prices:', error);
                }
            };

            fetchDiscountedPrices();
        }
    }, [accessToken]);

    const [discountedCartItems, setDiscountedCartItems] = useState([]);
    discountedCartItems.forEach(item => {
        console.log('Discounted item:', item);
    });
    useEffect(() => {

        const fetchAllExistingAddresses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/patient/checkoutAddress/allExisting', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                });
                if (response && response.data) {
                    setExistingAddresses(response.data);
                }
            } catch (error) {
                throw new Error('Invalid response data');
            }
        };

        fetchAllExistingAddresses();
    }, []);




    //get total price of order
    let totalCartPrice = 0;
    for (const item of discountedCartItems) {
        totalCartPrice += item.discountedPrice * item.quantity;
    }

    //handle select existing address
    const handleSelectExistingAddress = (event) => {
        if (event.target.value !== "") {
            setDeliveryAddress(event.target.value);
        }
    };

    //handle if user chose "add new address"
    const handleAddNewAddress = () => {
        setIsAddingNewAddress(true);
    };

    //handle getting new address
    const handleNewAddressChange = (event) => {
        setDeliveryAddress(event.target.value);

    };

    const [streetApartment, setStreetApartment] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    //handle saving into db after save is clicked
    const handleSaveNewAddress = async () => {
        if (streetApartment === "" || selectedCity === "") {
            return alert('Please enter a valid address!');
        }

        const fullAddress = `${streetApartment}, ${selectedCity}`;

        setIsAddingNewAddress(false);

        // Check if the full address already exists
        if (existingAddresses.includes(fullAddress)) {
            return alert('This address already exists! Please select it directly from the list');
        }

        try {
            const response = await axios.post(
                'http://localhost:8000/patient/checkoutAddress/addNew',
                { address: fullAddress },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                }
            );

            const updatedAddressesResponse = await axios.get(
                'http://localhost:8000/patient/checkoutAddress/allExisting',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                }
            );

            if (updatedAddressesResponse && updatedAddressesResponse.data) {
                setExistingAddresses(updatedAddressesResponse.data);
            }
        } catch (error) {
            console.error('Failed to add a new address:', error);
            throw error;
        }
    };

    //handle cancel in case user changes his mind about wanting to add new address
    const handleCancelNewAddress = () => {
        setIsAddingNewAddress(false);
        setDeliveryAddress('');
    };

    //redirect to payment
    const redirectToPayment = async () => {
        if (deliveryAddress === "") {
            return alert('Please select delivery address!')
        }
        try {
            // Fetch cartItems from BE
            // const response = await axios.get('http://localhost:8000/patient/checkoutAddress/payment');
            const username = sessionStorage.getItem("username");


            const updatedCartItems = cartItems.map(item => {
                const discountedItem = discountedCartItems.find(discountedItem => discountedItem.medName === item.medName);
                return {
                    ...item,
                    price_per_item: discountedItem ? discountedItem.discountedPrice : item.price_per_item,
                };
            });
            //console.log(updatedCartItems);

            navigate('/patient/payment', { state: { cartItems: updatedCartItems, deliveryAddress: deliveryAddress, username: username } })
            // setCartItems([]) -NPI
            // const queryParams = new URLSearchParams();
            // queryParams.append('cartItems', JSON.stringify(cartItems));
            // queryParams.append('deliveryAddress', deliveryAddress);

            // // Redirect to the payment page with the query string
            // window.location.href = `/patient/payment?${queryParams.toString()}`;
        } catch (error) {
            console.error('Error retrieving cartItems:', error);
        }
    };

    if (load) {
        return (<div>Loading</div>)
    }
    return (
        <>
            <br />

            <h1>Checkout</h1>
            <br />
            < div>
                <table className={styles["checkout-table"]}>
                    <thead>
                        <th>Medicine</th>
                        <th>Quantity</th>
                        <th>Price/Item (LE)</th>
                        <th>Price/Item after discount(LE)</th>
                        <th>Total Price (LE)</th>
                    </thead>
                    <tbody>
                        {
                            discountedCartItems && discountedCartItems.map((item) => (
                                <tr key={item.medName}>
                                    <td>{item.medName}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price_per_item}</td>
                                    <td>{item.discountedPrice}</td>
                                    <td>{item.discountedPrice * item.quantity}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div >
            <div className={styles["totalprice-container"]}>
                Total: {totalCartPrice.toFixed(2)} LE
            </div>

            <div className={styles["Delivery-header"]}> Delivery Address </div>

            <div className={styles["ddl-container"]}>
                {isAddingNewAddress ? (
                    <div>
                        <input
                            className={styles["newAddress-input"]}
                            type="text"
                            placeholder="Enter your street address"
                            value={streetApartment}
                            onChange={(e) => setStreetApartment(e.target.value)}
                        />
                        <br />
                        <br />

                        <div className={styles["ddl-newAddContainer"]}>
                            <select
                                className={styles["ddl-newAddselect"]}
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                            >
                                <br />

                                <option value="">Select City</option>
                                <option value="Cairo">Cairo</option>
                                <option value="Giza">Giza</option>
                                <option value="Alexandria">Alexandria</option>
                                <option value="Port Said">Port Said</option>
                                <option value="Suez">Suez</option>
                                <option value="Luxor">Luxor</option>
                                <option value="Asyut">Asyut</option>
                                <option value="Tanta">Tanta</option>
                                <option value="Ismailia">Ismailia</option>
                                <option value="Faiyum">Faiyum</option>
                                <option value="Zagazig">Zagazig</option>
                                <option value="Aswan">Aswan</option>
                                <option value="Damietta">Damietta</option>
                                <option value="Mansoura">Mansoura</option>
                                <option value="Beni Suef">Beni Suef</option>
                                <option value="Sohag">Sohag</option>
                                <option value="Hurghada">Hurghada</option>
                                <option value="6th of October City">6th of October City</option>
                            </select>
                        </div>
                        <br />

                        <button className={styles["saveAddress-button"]} onClick={handleSaveNewAddress}>
                            Save Address
                        </button>
                        <button className={styles["cancel-button"]} onClick={handleCancelNewAddress}>
                            Cancel
                        </button>
                        <br />
                        <br />

                    </div>
                ) : (
                    <button className={styles["addAddress-button"]} onClick={handleAddNewAddress}>Add New Address</button>
                )}


                <select className={styles["ddl-select"]} value={deliveryAddress} onChange={handleSelectExistingAddress}>
                    <option value=""> Select Delivery Address </option>
                    {
                        existingAddresses && existingAddresses.map((address, index) => (
                            <option key={index} value={address}>
                                {address}
                            </option>
                        ))}
                </select>
            </div>
            <div>
                <button className={styles["proceedPayment-button"]} onClick={redirectToPayment}>Proceed To Payment</button>
            </div>
        </>
    );
};

export default CheckoutAddress;