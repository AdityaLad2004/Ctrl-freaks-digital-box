// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Query = require('./models/Query');
const Complaint = require('./models/Complaint');


const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://atharvmandpe2:Athu234@cluster0.enfsd50.mongodb.net/complaintsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));



const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
  products: [String] // Add products field to User schema
}));

const ProductSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: String,
  details: mongoose.Schema.Types.Mixed // Use Mixed type to store arbitrary data
});

const Product = mongoose.model('Product', ProductSchema);


app.use(express.json());

const uploadRoute = require('./models/uploadfile');
app.use('/api/upload', uploadRoute);



app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    const isPasswordValid = password == user.password;
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid username or password' });

    res.status(200).json({ message: 'Login successful', user: user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/add_query', async (req, res) => {
  try {
    const { title, description, username } = req.body;

    const query = new Query({
      title,
      description,
      username
    });
    await query.save();

    res.status(201).json(query);
  } catch (error) {
    console.error('Error adding query:', error);
    res.status(500).json({ message: 'Failed to add query' });
  }
});


app.post('/complaints', async(req,res) => {
  try {
    const { product, username, title, description} = req.body;


    const complaint = new Complaint({
      product,
      username,
      title,
      description
    });
    await complaint.save();

    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})


app.get('/my_queries', async (req, res) => {
  try {
    const { username } = req.query;
    const queries = await Query.find({ username });
    res.status(200).json({ queries });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/my_complaints', async (req, res) => {
  try {
    const { username } = req.query;
    const complaints = await Complaint.find({ username });
    res.status(200).json({ complaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to fetch user products
app.get('/user_products', async (req, res) => {
  try {
    const { username } = req.query;

    console.log('Fetching products for username:', username);

    const user = await User.findOne({ username }).populate('products');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User products:', user.products);
    res.status(200).json({ products: user.products });
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});