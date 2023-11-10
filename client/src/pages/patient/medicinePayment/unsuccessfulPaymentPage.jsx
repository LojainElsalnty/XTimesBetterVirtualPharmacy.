// Axios
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function UnsuccessPayment() {
    const navigate = useNavigate();

    const receivedInfo = {
        cartItems: [{
            medName: "Medicine1",
            quantity: 2,
            price_per_item: 20
        }], deliveryAddress: " ",
        username: "john_doe123"
    };

    async function checkAuthentication() {
        await axios({
            method: 'get',
            url: `http://localhost:5000/authentication/checkAccessToken`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': accessToken,
                'User-type': 'patient',
            },
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                navigate('/login');
            });
    }

    checkAuthentication();

    const handleSubmit = () => {
        sessionStorage.removeItem('cartItems');//if redirect changed to another payment method remove this line!!!!
        window.location.href = "http://localhost:5173/patient/";

    };

    return (
        <div className="Success Payment">
            <h2>Unsuccessful Payment</h2>
            <button onClick={() => handleSubmit()}>Proceed</button>
        </div>

    );

}

export default UnsuccessPayment; 