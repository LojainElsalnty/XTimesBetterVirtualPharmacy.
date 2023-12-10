import React, { useState } from 'react';
import axios from 'axios';

const SalesFilter = () => {
  const [filterType, setFilterType] = useState('date');
  const [filterValue, setFilterValue] = useState('');
  const [salesData, setSalesData] = useState(null);
  const [totalOrderPrice, setTotalOrderPrice] = useState(null);
  const [error, setError] = useState(null);

  const handleFilter = async () => {
    try {
      let response;
       console.log(filterValue)
      if (filterType === 'date') {
        response = await axios.get(`http://localhost:5000/pharmacist/filterSales/enterdate/${filterValue}`);
      } else if (filterType === 'medicine') {
        response = await axios.get(`http://localhost:5000/pharmacist/filterSales/medicine/${filterValue}`);
      }

      setSalesData(response.data.salesMade);
      setTotalOrderPrice(response.data.totalOrderPrice);
      console.log(response.data);
      setError(null);
    } catch (err) {
        console.log(response.data.error);
      setError('Error filtering sales.');
      setSalesData(null);
      setTotalOrderPrice(null);
    }
  };

  return (
    <div>
      <h1>Sales Filter</h1>
      <div>
        <label>
          Filter By:
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="date">Date</option>
            <option value="medicine">Medicine</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Enter {filterType === 'date' ? 'Date' : 'Medicine Name'}:
          <input
            type={filterType === 'date' ? 'date' : 'text'}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleFilter}>Filter</button>
      </div>
      {error && <p>{error}</p>}
      {salesData && (
        <div>
          <h2>Sales Data</h2>
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

export default SalesFilter;