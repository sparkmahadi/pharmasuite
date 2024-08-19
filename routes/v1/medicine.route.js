const express = require('express');
const medicineController = require('../../controllers/medicine.controller');

const router = express.Router();

router.route("/:id")
/**
 * @api {get} /api/v1/medicine/:id
 * @apiDescription Get a medicine details
 * @apiPermission All Users
 * @apiHeader nothing
 * @apiParam id
 * @apiSuccess {Object}
 * @apiError no data available in database
 */
.get(medicineController.getMedicineById)


/**
 * @api {put} /api/v1/medicine/:id
 * @apiDescription Update a medicine details
 * @apiPermission All Users
 * @apiHeader nothing
 * @apiParam id
 * @apiSuccess {Object}
 * @apiError no data available in database
 */
.put(medicineController.updateMedicineById)

/**
 * @api {delete} /api/v1/medicine/:id
 * @apiDescription Delete a medicine from DB
 * @apiPermission All Users
 * @apiHeader nothing
 * @apiParam id
 * @apiSuccess {Object}, success message
 * @apiError no data available in database
 */
.delete(medicineController.deleteMedicineById)

router.route("/lastSoldDate/:id")
/**
 * @api {put} /api/v1/medicine/lastSoldDate/:id
 * @apiDescription Update a lastSoldDate of a medicine
 * @apiPermission All Users
 * @apiHeader nothing
 * @apiBody last Sold Date as string
 * @apiParam id
 * @apiSuccess {Object}
 * @apiError no data available in database
 */
.put(medicineController.updateLastSoldDate)

router.route("/sell/:id")
/**
 * @api {put} /api/v1/medicine/:id
 * @apiDescription Update sold amount after selling a medicine
 * @apiPermission All Users
 * @apiHeader nothing
 * @apiBody new amount as integer
 * @apiParam id
 * @apiSuccess {Object}
 * @apiError no data available in database
 */
.put(medicineController.updateSoldAmount)


router.route(":/id/:field")
/**
 * @api {delete} /api/v1/medicine/:id/:field
 * @apiDescription Delete a field of a medicine
 * @apiPermission All Users
 * @apiHeader nothing
 * @apiParam id
 * @apiSuccess {Object}, success message
 * @apiError no data available in database
 */
.delete(medicineController.deleteFieldsById)

module.exports = router;