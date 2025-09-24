const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// To allow front to access the images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Active the CORS و JSON
app.use(cors());
app.use(express.json());


const products = require('./products');

// API For Products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Tp start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
