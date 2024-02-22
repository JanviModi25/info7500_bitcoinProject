const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes//
app.use(cors());

// Define the API endpoint URL
const apiUrl = 'https://api.bitaps.com/btc/v1/blockchain/address/transactions/1UiW61F9xnBnnC1J69aPJhFm3ZXvZEkCm';

// Route to fetch and return the data from the API
app.get('/', async (req, res) => {
    try {
        // Make a GET request to the API endpoint
        const response = await axios.get(apiUrl);

        // Return the data from the API as the response
        res.json(response.data);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error.message);
        // Return an error response to the client
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start the server
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
