const express = require('express');
const medicineController = require('../../controllers/medicine.controller');

const router = express.Router();

router.route("/:id")
.get(medicineController.getMedicineById)
.put(medicineController.updateMedicineById)

router.route("/lastSoldDate/:id").put(medicineController.updateLastSoldDate)
router.route("/sell/:id").put(medicineController.updateSoldAmount)


module.exports = router;