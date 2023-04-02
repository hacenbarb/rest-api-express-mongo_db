const express = require("express");
const controller = require("../controllers/Controller");

const router = express.Router();
//Post Method
router.post("/post", controller.addData);

//Get all Method
router.get("/getAll", controller.getAll);

//Get by ID Method
router.get("/getOne/:id", controller.getOne);

//Update by ID Method
router.patch("/update/:id", controller.updateById);

//Delete by ID Method
router.delete("/delete/:id", controller.deleteById);

module.exports = router;
