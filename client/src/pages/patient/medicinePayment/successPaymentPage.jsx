import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function SuccessPayment() {

    const location = useLocation();
    const receipt = location.state.receipt;
    console.log(receipt);
    const handleSubmit = () => {
        window.location.href = 'http://localhost:5173/patient';
    }
    return (
        <div className="Success Payment">
            <h2>Success Payment</h2>
            <div>
                <h3>Order Information</h3>
                <div className="order-items" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ul>
                        {receipt && receipt.orderItems ? (
                            receipt.orderItems.map((item, index) => (
                                <li key={index}>
                                    <p>Medicine Name: {item.medName}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price per Item: {item.price_per_item}</p>
                                </li>
                            ))
                        ) : (
                            <li>
                                <p>No order items available.</p>
                            </li>
                        )}
                    </ul>
                </div>
                <p>Delivery Address: {receipt.deliveryAddress}</p>
                <p>Payment through: {receipt.paymentMethod}</p>
                <p>Status: {receipt.status}</p>
            </div>
            <button onClick={() => handleSubmit()}>Proceed</button>
        </div>

    );

}

export default SuccessPayment; 
