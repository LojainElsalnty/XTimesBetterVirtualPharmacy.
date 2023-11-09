import { useNavigate } from 'react-router-dom';

function SuccessPaymentCreditCard() {

    const navigate = useNavigate();

    const receivedInfo = {
        cartItems:[{
            medName: "Medicine1",
            quantity: 2,
            price_per_item : 20
        }], deliveryAddress: " ",
        username: "john_doe123"
    };
    
    const handleSubmit = () => {
        fetch(`http://localhost:5000/patient/afterCreditCardPayment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            
             body : JSON.stringify(receivedInfo)
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(data => {
            // console.log("order",data.order)
            // console.log(receipt)
            navigate('/patient/successPayment', { state: { receipt: data.order, } });

        });
    };

    return (
        <div className="Success Payment">
            <h2>Success Payment</h2>

            <button onClick={() => handleSubmit()}>View Order Info</button>
        </div>

    );

}

export default SuccessPaymentCreditCard; 
