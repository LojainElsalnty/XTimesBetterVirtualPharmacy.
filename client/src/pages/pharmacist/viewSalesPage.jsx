import React, { useState } from 'react';
import axios from 'axios';

const SalesView = () => {
  const [chosenMonth, setChosenMonth] = useState('');
  const [salesData, setSalesData] = useState(null);
  const [totalOrderPrice, setTotalOrderPrice] = useState(null);
  const [error, setError] = useState(null);

  const handleFilter = async () => {
    try {
        console.log(chosenMonth)
      let response;
      response = await axios.get(`http://localhost:5000/pharmacist/viewSales/month/${chosenMonth}`);

      setSalesData(response.data.salesMade);
      setTotalOrderPrice(response.data.totalOrderPrice);
      setError(null);
    } catch (err) {
      setError('Error filtering sales.');
      setSalesData(null);
      setTotalOrderPrice(null);
    }
  };

  // Function to get an array of month objects with name and number
  const getMonthOptions = () => {
    const months = [
      { name: 'January', number: 1 },
      { name: 'February', number: 2 },
      { name: 'March', number: 3 },
      { name: 'April', number: 4 },
      { name: 'May', number: 5 },
      { name: 'June', number: 6 },
      { name: 'July', number: 7 },
      { name: 'August', number: 8 },
      { name: 'September', number: 9 },
      { name: 'October', number: 10 },
      { name: 'November', number: 11 },
      { name: 'December', number: 12 },
    ];
    return months;
  };

  return (
    <div>
      <h1>Total Sales</h1>
      <div>
        <label>
          Choose a Month:
          <select
            value={chosenMonth}
            onChange={(e) => setChosenMonth(e.target.value)}
          >
            <option value="">Select a Month</option>
            {getMonthOptions().map((month) => (
              <option key={month.number} value={month.number}>
                {month.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <button onClick={handleFilter}>View</button>
      </div>
      {error && <p>{error}</p>}
      {salesData && (
        <div>
          <h2>Monthly Sales</h2>
          <p>Total Sales: {totalOrderPrice}</p>
          <table>
            <thead>
              <tr>
                <th>Medicine</th>
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
