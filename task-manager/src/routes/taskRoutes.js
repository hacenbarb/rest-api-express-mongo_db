const express = require("express");
const taskController = require("../controllers/taskController");
const Router = express.Router();

/* GET */

Router.get("/task/all", taskController.getAllTasks);
Router.get("/task/:id", taskController.getTaskById);
Router.get("/task/status/:id", taskController.getStatusById);

/* POST */
Router.post("/add-task", taskController.addTask);

/* PATCH */
Router.patch("/task/done/:id", taskController.doneTask);
Router.patch("/task/toggleStatus/:id", taskController.toggleTaskStatus);
Router.patch("/task/edit/:id", taskController.editTask);

/* DELETE */
Router.delete("/task/:id", taskController.deleteTaskById);

Router.get('*', (req, res) => {
  res.status(404).send("Sorry, can't find that!");
});

module.exports = Router;
