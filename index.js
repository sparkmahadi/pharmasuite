const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./utils/connectDB');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectToDB()
    .then(() => {
        app.listen(port, () => { console.log(`pharmasuite server is running on port ${port}`); })
    })
    .catch((err) => {
        console.error('Error starting server:', err);
    });


app.get('/', (req, res) => {
    res.send('pharmasuite server is running')
})
