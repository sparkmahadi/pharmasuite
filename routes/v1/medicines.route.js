const express = require('express');
const medicinesController = require('../../controllers/medicines.controller');

const router = express.Router();

router.route("/")
.get(medicinesController.getMedicines)

module.exports = router;