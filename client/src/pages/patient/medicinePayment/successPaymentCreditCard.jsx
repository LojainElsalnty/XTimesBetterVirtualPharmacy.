import { useNavigate } from 'react-router-dom';

function SuccessPaymentCreditCard() {

    const navigate = useNavigate();

    // const receivedInfo = {
    //     cartItems:[{
    //         medName: "Medicine1",
    //         quantity: 2,
    //         price_per_item : 20
    //     }], deliveryAddress: " ",
    //     username: "john_doe123"
    // };

    const handleSubmit = () => {
        localStorage.removeItem('cartItems');
        window.location.href = "http://localhost:5173/patient/";
    };

    return (
        <div className="Success Payment">
            <h2>Success Payment</h2>

            <button onClick={() => handleSubmit()}>Proceed</button>
        </div>

    );

}

export default SuccessPaymentCreditCard; 
