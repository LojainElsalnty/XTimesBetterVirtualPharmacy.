// Axios
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

function UnsuccessPayment() {
    const navigate = useNavigate();
    // const accessToken = sessionStorage.getItem('accessToken');

    // const receivedInfo = {
    //     cartItems: [{
    //         medName: "Medicine1",
    //         quantity: 2,
    //         price_per_item: 20
    //     }], deliveryAddress: " ",
    //     username: "john_doe123"
    // };
    //new part
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
            url: 'http://localhost:8000/authentication/checkAccessToken',
            headers: {
                "Content-Type": "application/json",
                'Authorization': accessToken,
                'User-type': 'patient',
            },
        })
            .then((response) => {
                // console.log(response);
                setUsername(response.data.username);
                //setLoad(false);
            })
            .catch((error) => {
                //setLoad(false);
                navigate('/login');

            });
    }

    const xTest = checkAuthentication();

    const handleSubmit = () => {
        sessionStorage.removeItem('cartItems');//if redirect changed to another payment method remove this line!!!!
        window.location.href = "http://localhost:5173/patient/";

    };

    if (load) {
        return (<div>Loading</div>)
    }

    return (
        <div className="Success Payment">
            <h2>Unsuccessful Payment</h2>
            <button onClick={() => handleSubmit()}>Proceed</button>
        </div>

    );

}

export default UnsuccessPayment; 