import { useNavigate } from 'react-router-dom';

function unsuccessPayment() {

    const navigate = useNavigate();

    const receivedInfo = {
        cartItems: [{
            medName: "Medicine1",
            quantity: 2,
            price_per_item: 20
        }], deliveryAddress: " ",
        username: "john_doe123"
    };

    const handleSubmit = () => {
        localStorage.removeItem('cartItems'); //if redirect changed to another payment method remove this line!!!!
        window.location.href = "http://localhost:5173/patient/";

    };

    return (
        <div className="Success Payment">
            <h2>Unsuccessful Payment</h2>
            <button onClick={() => handleSubmit()}>Proceed</button>
        </div>

    );

}

export default unsuccessPayment; 