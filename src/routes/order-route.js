const express = require("express");
const orderController = require("../controllers/order-controller");
const router = express.Router();

router.get("/",orderController.fetchOrders);
router.post("/create", orderController.createOrder);
router.patch("/:orderId", orderController.editOrder);
router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;
