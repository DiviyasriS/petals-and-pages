const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory orders database
let orders = [];
let orderIdCounter = 1;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'order-service' });
});

// Get all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Create new order
app.post('/api/orders', (req, res) => {
  const { items, totalPrice, customerName, address } = req.body;
  
  const newOrder = {
    id: orderIdCounter++,
    items,
    totalPrice,
    customerName,
    address,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Update order status
app.patch('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (order) {
    order.status = req.body.status || order.status;
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Order service running on port ${PORT}`);
});