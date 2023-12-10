const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const medOrderModel = require('../../models/MedOrder');
const bcrypt = require('bcrypt');

const filterSalesByDateRange = async (req, res) => {
  try {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    console.log(startDate, endDate);
    console.log(new Date(startDate));
    console.log(new Date(endDate));
    const endDatePlusOneDay = new Date(endDate);
    endDatePlusOneDay.setDate(endDatePlusOneDay.getDate() + 1);

    const selectedMedName = req.params.medName; // Add this line to get the selected medicine from the request parameters

    const query = {
      status: 'Delivered',
      createdAt: {
        $gte: new Date(startDate),
        $lt: endDatePlusOneDay,
      },
    };

    if (selectedMedName && selectedMedName !== 'all') {
      query['orderItems.medName'] = selectedMedName;
    }

    const salesMade = await medOrderModel.find(query);

    if (salesMade.length === 0) {
      // No sales made in the specified date range
      console.log(`No sales made in the specified date range.`);
      res.status(200).json({ salesMade: [], totalOrderPrice: 0, uniqueMedNames: [] });
      return;
    }

    let totalOrderPrice = 0;
    const uniqueMedNames = new Set();

    salesMade.forEach((order) => {
      order.orderItems.forEach((item) => {
        if (item.medName) {  // Check if the medication name is non-null
          uniqueMedNames.add(item.medName);
          if (!selectedMedName || selectedMedName === 'all' || selectedMedName === item.medName) {
            totalOrderPrice += item.quantity * item.price_per_item;
          }
        }
      });
    });

    console.log(totalOrderPrice);
    res.status(200).json({ salesMade, totalOrderPrice, uniqueMedNames: Array.from(uniqueMedNames) });
  } catch (error) {
    console.error('Error fetching completed orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { filterSalesByDateRange };