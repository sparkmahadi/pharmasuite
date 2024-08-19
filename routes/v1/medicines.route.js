const express = require('express');
const medicinesController = require('../../controllers/medicines.controller');

const router = express.Router();

router.route("/")
.get(medicinesController.getMedicines)
.post(medicinesController.postMedicine)

router.route("/top").get(medicinesController.getTopMedicines)
router.route("/latestSold").get(medicinesController.getLatestSoldMedicines)

router.route("/search/:term").get(medicinesController.searchMedicines)

module.exports = router;