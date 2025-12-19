const cors = require('cors'); // Sabse upar
app.use(cors()); // app = express() ke niche
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Ye aapka temporary data hai
let userBalance = 100;

// Balance check karne ke liye rasta
app.get('/balance', (req, res) => {
    res.json({ balance: userBalance });
});

app.listen(PORT, () => {
    console.log(`Backend server chalu hai: http://localhost:${PORT}`);
});