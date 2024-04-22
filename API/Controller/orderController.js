const makeOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
};

const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
};
