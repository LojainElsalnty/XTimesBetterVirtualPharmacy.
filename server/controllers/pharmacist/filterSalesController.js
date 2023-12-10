const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const medOrderModel = require('../../models/MedOrder');
const bcrypt = require('bcrypt');


const filterSalesBydate = async (req, res) => {
  try {
    const enteredDate = new Date(req.params.date);
    
    // Set the time to the beginning of the entered date
    //enteredDate.setHours(0, 0, 0, 0);

    // Set the time to the beginning of the next day
    const nextDay = new Date(enteredDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const salesMade = await medOrderModel.find({
      createdAt: {
        $gte: enteredDate,
        $lt: nextDay,
      },
      status: 'Delivered',
    })
     console.log(enteredDate, nextDay, salesMade)
    let totalOrderPrice = 0;

    salesMade.forEach((order) => {
      order.orderItems.forEach((item) => {
        totalOrderPrice += item.quantity * item.price_per_item;
      });
    });

    console.log(totalOrderPrice);
    res.status(200).json({ salesMade, totalOrderPrice });
  } catch (error) {
    res.status(500).json({ error: "Error filtering sales by date" });
  }
};
  
  const filterSalesByMedicine = async (req, res) => {
    try {
      const enteredMedicine = req.params.medName;
      console.log(enteredMedicine);
      const salesMade = await medOrderModel.find({
        'orderItems.medName': enteredMedicine,
        status: 'Delivered',
      });
      let totalOrderPrice=0;
      salesMade.forEach((order) => {
        order.orderItems.forEach((item) => {
          totalOrderPrice += item.quantity * item.price_per_item;
        });
      });
  
      console.log(totalOrderPrice);

      //const totalOrderPrice = salesFilteredByMedicine.reduce((total, order) => total + order.orderPrice, 0);
      console.log(salesMade, totalOrderPrice)
      res.status(200).json({ salesMade, totalOrderPrice });
    } catch (error) {
      res.status(500).json({ error: "Error filtering sales by Medicine Name" });
    }
  };
  
  module.exports = { filterSalesByMedicine, filterSalesBydate };