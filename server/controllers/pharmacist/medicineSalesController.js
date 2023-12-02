const filterSalesByMonth = async (req, res) => {
  try {
    const { chosenMonth } = req.query;

    const parsedMonth = parseInt(chosenMonth, 10);

    if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
      return res.status(400).json({ error: 'Invalid or missing chosenMonth parameter' });
    }

    const completedOrders = await MedOrder.find({
      status: 'Delivered',
      createdAt: {
        $gte: new Date(parsedMonth, 1),
        $lt: new Date(parsedMonth + 1, 1),
      },
    });

    const filteredOrderItems = completedOrders.map(order => ({
      medName: order.orderItems.medName,
      quantity: order.orderItems.quantity,
    }));

    const totalOrderPrice = completedOrders.reduce((total, order) => total + order.orderPrice, 0);

    res.json({ completedOrderItems: filteredOrderItems, totalOrderPrice });
  } catch (error) {
    console.error('Error fetching completed orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const filterSalesBydate = async (req, res) => {
  try {
    const enteredDate = req.query.createdAt;
    const salesMade = await medOrderModel.find({
      createdAt: new Date(enteredDate),
      status: 'Delivered',
    }).select('orderItems.medName orderItems.quantity');

    res.status(200).json(salesMade);
  } catch (error) {
    res.status(500).json({ error: "Error filtering sales by date" });
  }
};

const filterSalesByMedicine = async (req, res) => {
  try {
    const enteredMedicine = req.query.orderItems.medName;
    const salesFilteredByMedicine = await medOrderModel.find({
      'orderItems.medName': enteredMedicine,
      status: 'Delivered',
    }).select('orderItems.medName orderItems.quantity');

    res.status(200).json(salesFilteredByMedicine);
  } catch (error) {
    res.status(500).json({ error: "Error filtering sales by Medicine Name" });
  }
};

module.exports = { filterSalesByMonth, filterSalesByMedicine, filterSalesBydate };