const express = require('express');
const medicinesController = require('../../controllers/medicines.controller');

const router = express.Router();

router.route("/")

/**
 * @api {get} /api/v1/medicines
 * @apiDescription Get all medicines
 * @apiPermission All Users
 * @apiHeader nothing
 * @apiParam nothing
 * @apiSuccess {Object[]} full lot information
 * @apiError no data available in database
 */
.get(medicinesController.getMedicines)

/**
 * @api {post} /api/v1/medicines
 * @apiDescription Post medicine with details
 * @apiPermission Admin only
 * @apiHeader nothing
 * @apiBody {Object}
 * @apiParam nothing
 * @apiSuccess {Object}
 * @apiError no data available in database
 */
.post(medicinesController.postMedicine)

router.route("/top").
/**
 * @api {get} /api/v1/medicines/top
 * @apiDescription Get top 20 medicines counted by sold amount
 * @apiPermission All Users
 * @apiHeader nothing
 * @apiParam nothing
 * @apiSuccess {Object[]} full lot information
 * @apiError no data available in database
 */
get(medicinesController.getTopMedicines)


router.route("/latestSold").
/**
 * @api {get} /api/v1/medicines/latestSold
 * @apiDescription Get latest medicines on last sold date
 * @apiPermission All Users
 * @apiHeader nothing
 * @apiParam nothing
 * @apiSuccess {Object[]} full lot information
 * @apiError no data available in database
 */
get(medicinesController.getLatestSoldMedicines)

router.route("/search/:term")
/**
 * @api {get} /api/v1/medicines/search/:term
 * @apiDescription Get medicines by name, company, generic
 * @apiPermission All Users
 * @apiHeader nothing
 * @apiParam term
 * @apiSuccess {Object[]} full lot information
 * @apiError no data available in database
 */
.get(medicinesController.searchMedicines)

module.exports = router;