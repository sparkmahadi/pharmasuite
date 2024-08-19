const express = require('express');
const cors = require('cors');
require('dotenv').config();


const { connectToDB } = require('./utils/connectDB');

const medicinesRoute = require('./routes/v1/medicines.route');
const medicineRoute = require('./routes/v1/medicine.route');


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

app.use("/api/v1/medicines", medicinesRoute);
app.use("/api/v1/medicine", medicineRoute);

app.get('/', (req, res) => {
    res.send('pharmasuite server is running')
})

app.all("*", (req, res) => {
    res.send("No routes found in server");
})