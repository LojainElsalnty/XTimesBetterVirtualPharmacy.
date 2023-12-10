const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const medOrderModel = require('../../models/MedOrder');
const bcrypt = require('bcrypt');

const filterSalesByDateRange = async (req, res) => {
  
  try {
    //console.log(req.params.data);
    const startDate= req.params.startDate;
    const endDate=req.params.endDate;
    console.log(startDate, endDate);
    console.log( new Date(startDate));
    console.log(new Date(endDate));
    const endDatePlusOneDay = new Date(endDate);
    endDatePlusOneDay.setDate(endDatePlusOneDay.getDate() + 1);

    const salesMade = await medOrderModel.find({
      status: 'Delivered',
      createdAt: {
        $gte: new Date(startDate),
        $lt: endDatePlusOneDay
      },
    });

    if (salesMade.length === 0) {
      // No sales made in the specified date range
      console.log(`No sales made in the specified date range.`);
      res.status(200).json({ salesMade: [], totalOrderPrice: 0 });
      return;
    }

    let totalOrderPrice = 0;

    salesMade.forEach((order) => {
      order.orderItems.forEach((item) => {
        totalOrderPrice += item.quantity * item.price_per_item;
      });
    });

    console.log(totalOrderPrice);
    res.status(200).json({ salesMade, totalOrderPrice });
  } catch (error) {
    console.error('Error fetching completed orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { filterSalesByDateRange };