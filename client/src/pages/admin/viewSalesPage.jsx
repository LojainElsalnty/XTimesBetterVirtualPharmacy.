import React, { useState } from 'react';
import axios from 'axios';

const SalesView = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesData, setSalesData] = useState(null);
  const [totalOrderPrice, setTotalOrderPrice] = useState(null);
  const [error, setError] = useState(null);

  const handleFilter = async () => {
    if (!startDate || !endDate) {
      setError('Please enter both start and end dates.');
      return;
    }
    const data={
      startDate: startDate,endDate: endDate
    }
    console.log(data);
    try {
      console.log(startDate);
      console.log(endDate);
      const response = await axios.get(`http://localhost:5000/admin/viewSales/${startDate}/${endDate}`)
      setSalesData(response.data.salesMade);
      setTotalOrderPrice(response.data.totalOrderPrice);
      setError(null);
    } catch (err) {
      setError('Error filtering sales.');
      setSalesData(null);
      setTotalOrderPrice(null);
    }
  };

  return (
    <div>
      <h1>Sales Report</h1>
      <div>
        <label>
          Start Date: 
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <p>     </p>
        <label>
          End Date: 
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <div>
      <button onClick={handleFilter} style={{ backgroundColor: 'blue', color: 'white', padding: '8px 12px', cursor: 'pointer' }}>
          View
        </button>
      </div>
      {error && <p>{error}</p>}
      {salesData && (
        <div>
          
          <p>Total order prices: {totalOrderPrice}</p>
          <table>
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Price/Item (LE)</th>
                <th>Total Price (LE)</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((order, index) => (
                order.orderItems.map((item, itemIndex) => (
                  <tr key={`${index}-${itemIndex}`}>
                    <td>{item.medName}</td>
                    <td>{new Date(new Date(order.createdAt).setDate(new Date(order.createdAt).getDate() - 1)).toLocaleDateString()}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price_per_item}</td>
                    <td>{item.price_per_item * item.quantity}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesView;