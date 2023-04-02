const express = require("express");
const taskController = require("../controllers/taskController");
const Router = express.Router();

/* GET */
Router.get("/task/:id", taskController.getTaskById);
Router.get("/task/status/:id", taskController.getStatusById);

/* POST */
Router.post("/add-task", taskController.addTask);

/* PATCH */
Router.patch("/task/:id", taskController.doneTask);

/* DELETE */
Router.delete("/task/:id", taskController.deleteTaskById);



module.exports = Router;
