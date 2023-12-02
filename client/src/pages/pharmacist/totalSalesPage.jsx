import React, { useState } from 'react';
import axios from 'axios';

const SalesFilterComponent = () => {
  const [chosenMonth, setChosenMonth] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  const [enteredMedicine, setEnteredMedicine] = useState('');
  const [result, setResult] = useState([]);
  const [totalOrderPrice, setTotalOrderPrice] = useState(null);

  const handleFilterByMonth = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/pharmacist/filterSales/filterSalesByMonth?chosenMonth=${chosenMonth}`);
      setResult(response.data.completedOrderItems);
      setTotalOrderPrice(response.data.totalOrderPrice);
    } catch (error) {
      console.error('Error filtering by month:', error);
    }
  };

  const handleFilterByDate = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/pharmacist/filterSales/filterSalesByDate?createdAt=${enteredDate}`);
      setResult(response.data);
      setTotalOrderPrice(null);
    } catch (error) {
      console.error('Error filtering by date:', error);
    }
  };

  const handleFilterByMedicine = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/pharmacist/filterSales/filterSalesByMedicine?orderItems.medName=${enteredMedicine}`);
      setResult(response.data);
      setTotalOrderPrice(null);
    } catch (error) {
      console.error('Error filtering by medicine:', error);
    }
  };

  return (
    <div>
      <h2>Sales Filter</h2>
      
      <div>
        <label>Month:</label>
        <input type="text" value={chosenMonth} onChange={(e) => setChosenMonth(e.target.value)} />
        <button onClick={handleFilterByMonth}>Filter by Month</button>
      </div>

      <div>
        <label>Date:</label>
        <input type="text" value={enteredDate} onChange={(e) => setEnteredDate(e.target.value)} />
        <button onClick={handleFilterByDate}>Filter by Date</button>
      </div>

      <div>
        <label>Medicine:</label>
        <input type="text" value={enteredMedicine} onChange={(e) => setEnteredMedicine(e.target.value)} />
        <button onClick={handleFilterByMedicine}>Filter by Medicine</button>
      </div>

      <div>
        <h3>Results:</h3>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>

      {totalOrderPrice !== null && (
        <div>
          <h3>Total Order Price:</h3>
          <p>{totalOrderPrice}</p>
        </div>
      )}
    </div>
  );
};

export default SalesFilterComponent;