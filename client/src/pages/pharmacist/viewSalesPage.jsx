import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesView = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesData, setSalesData] = useState(null);
  const [totalOrderPrice, setTotalOrderPrice] = useState(null);
  const [error, setError] = useState(null);
  const [allUniqueMedNames, setAllUniqueMedNames] = useState([]);
  const [selectedMedName, setSelectedMedName] = useState('all');

  const handleFilter = async () => {
    const data = {
      startDate: startDate,
      endDate: endDate,
      medName: selectedMedName,
    };

    try {
      const response = await axios.get(`http://localhost:5000/pharmacist/viewSales/${startDate}/${endDate}/${selectedMedName}`);
      setSalesData(response.data.salesMade);
      setTotalOrderPrice(response.data.totalOrderPrice);
      setAllUniqueMedNames(response.data.uniqueMedNames || []);
      setError(null);
    } catch (err) {
      setError('Error filtering sales.');
      setSalesData(null);
      setTotalOrderPrice(null);
      setAllUniqueMedNames([]);
    }
  };

  useEffect(() => {
    if (allUniqueMedNames.length > 0) {
      setSelectedMedName('all');
    }
  }, [allUniqueMedNames]);

  useEffect(() => {
    if (salesData && salesData.length > 0) {
      const lastOrder = salesData[salesData.length - 1];
      const lastOrderItems = lastOrder.orderItems;

      const cumulative = lastOrderItems.reduce(
        (accumulator, item) => {
          accumulator.totalQuantity += item.quantity;
          accumulator.totalPricePerItem += item.price_per_item;
          accumulator.totalTotalPrice += item.price_per_item * item.quantity;
          return accumulator;
        },
        {
          totalQuantity: 0,
          totalPricePerItem: 0,
          totalTotalPrice: 0,
        }
      );

      // No need to use cumulativeValues state, calculate directly
      setTotalOrderPrice(cumulative.totalTotalPrice);
    }
  }, [salesData]);

  const handleMedNameChange = (event) => {
    setSelectedMedName(event.target.value);
  };

  const filteredSalesData = selectedMedName && selectedMedName !== 'all'
    ? salesData.filter((order) =>
      order.orderItems.some((item) => item.medName === selectedMedName)
    )
    : salesData || [];

  // Calculate cumulative total price
  let totalOrders = 0;
  filteredSalesData.forEach((order) => {
    order.orderItems.forEach((item) => {
      totalOrders += item.price_per_item * item.quantity;
    });
  });

  return (
    <div>
      <h1>Sales Report</h1>
      <div>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <p> </p>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </div>
      <div>
        <button onClick={handleFilter}>View</button>
      </div>
      {error && <p>{error}</p>}
      {salesData && (
        <div>
          <label>
            Select Medicine:
            <select value={selectedMedName} onChange={handleMedNameChange}>
              <option value="all">No Filter</option>
              {allUniqueMedNames.map((medName, index) => (
                <option key={index} value={medName}>
                  {medName}
                </option>
              ))}
            </select>
          </label>
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
              {(filteredSalesData.length > 0 ? filteredSalesData : salesData).map(
                (order, index) =>
                  order.orderItems.map((item, itemIndex) => (
                    <tr key={`${index}-${itemIndex}`}>
                      <td>{item.medName}</td>
                      <td>{new Date(new Date(order.createdAt).setDate(new Date(order.createdAt).getDate() - 1)).toLocaleDateString()}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price_per_item}</td>
                      <td>{item.price_per_item * item.quantity}</td>
                    </tr>
                  ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">Total Orders:</td>
                <td>{totalOrders}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesView;
