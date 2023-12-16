import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './viewReq.module.css';

const SalesView = () => {

  //Authenticate part
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
        'User-type': 'admin',
      },
    })
      .then((response) => {
        console.log(response);
        setUsername(response.data.username);
        //setLoad(false);
      })
      .catch((error) => {
        //setLoad(false);
        navigate('/login');

      });
  }

  const xTest = checkAuthentication();



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
    const data = {
      startDate: startDate, endDate: endDate
    }
    console.log(data);
    try {
      console.log(startDate);
      console.log(endDate);
      const response = await axios.get(`http://localhost:8000/admin/viewSales/${startDate}/${endDate}`)
      setSalesData(response.data.salesMade);
      setTotalOrderPrice(response.data.totalOrderPrice);
      setError(null);
    } catch (err) {
      setError('Error filtering sales.');
      setSalesData(null);
      setTotalOrderPrice(null);
    }
  };

  if (load) {
    return (<div>Loading</div>)
  }

  return (
    <div>
      <br />
      <h1>Sales Report</h1><br />
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label> <br />
        <br />
        <br />
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <br />
      <div>
        <button onClick={handleFilter} style={{ backgroundColor: '#054574', color: 'white', padding: '8px 12px', cursor: 'pointer' }}>
          View
        </button>
      </div>
      <br />
      {error && <p>{error}</p>}
      {salesData && (
        <div>

          <table className={styles.pharmacistTable}>
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
            <tfoot>
              <tr>
                <td colSpan="4"> Total Sales:</td>
                <td >{totalOrderPrice}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesView;