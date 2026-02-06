const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Health endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Business endpoint
app.get('/api/a', (req, res) => {
    res.json({ data: 'Hello from microservice A' });
});

app.listen(PORT, () => {
    console.log(`Service A running on port ${PORT}`);
});
