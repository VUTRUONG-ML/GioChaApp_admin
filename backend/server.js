const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.route');
const foodRoutes = require('./routes/food.route');
const categoryRoutes = require('./routes/category.route');
const cartRoutes = require('./routes/cart.route');
const orderRoutes = require('./routes/order.route');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.get('/', (req, res) => res.send('Backend running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
