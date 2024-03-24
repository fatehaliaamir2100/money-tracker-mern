const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Transaction = require('./models/Transactions');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ body: 'test ok' }); // Fix the response JSON format
});

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect("mongodb+srv://admin:admin@money-tracker.udgkdwe.mongodb.net/?retryWrites=true&w=majority&appName=money-tracker");
    const {name, date, description, price} = req.body
    const transaction = await Transaction.create({name, date, description, price})
    res.json(transaction); 
}); 

app.get('/api/transactions', async (req, res) => {
    await mongoose.connect("mongodb+srv://admin:admin@money-tracker.udgkdwe.mongodb.net/?retryWrites=true&w=majority&appName=money-tracker");
    const transactions = await Transaction.find();
    res.json(transactions);
})

app.listen(3001, () => {
    console.log('Example app listening on port 3000!');
});
