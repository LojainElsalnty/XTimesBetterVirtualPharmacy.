const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const medOrderModel = require('../../models/MedOrder');
const bcrypt = require('bcrypt');

const filterSalesByMonth = async (req, res) => {
  try {
    const chosenMonth = req.params.month;
    console.log(chosenMonth);

    // Create a start date for the chosen month in the year 2023
    const startDate = new Date(`2023-${chosenMonth}-01T00:00:00.000Z`);
    
    // Calculate the end date for the chosen month in the year 2023
    const endDate = new Date(startDate);
    endDate.setUTCMonth(startDate.getUTCMonth() + 1);

    console.log(startDate.toISOString(), endDate.toISOString());

    const salesMade = await medOrderModel.find({
      status: 'Delivered',
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    if (salesMade.length === 0) {
      // No sales made in the chosen month in the year 2023
      console.log(`No sales made in ${chosenMonth} 2023.`);
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

module.exports = { filterSalesByMonth };