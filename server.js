const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const deliveryRoutes = require("./routes/deliveryRoutes");
const orderRoutes = require("./routes/OrderRoutes");




// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://mohamadyaseen233:z2bysY5WLzKjsxmS@yaseen.jnnukqz.mongodb.net/?retryWrites=true&w=majority&appName=Yaseen',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Failed to connect to MongoDB:', err));

// Simple Route to Check Server
app.get('/', (req, res) => {
    res.send('Backend Server is Running! Hello yaseen');
});

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/menu',menuRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/orders", orderRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
