const Task = require("../models/taksModel");

async function addTask(req, res) {
  try {
    const { name, dueDate } = req.body;
    const data = new Task({
      name,
      dueDate,
    });
    const dataToSave = await data.save().catch((err) =>
      res
        .status(301)
        .json(err.name + ": " + err.message)
        .end()
    );
    res.status(200).json(dataToSave);
  } catch (error) {
    console.error(error);
  }
}
async function doneTask(req, res) {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status: true },
      { new: true }
    ).catch((error) => res.status(301).json({ error: error }).end());
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
  }
}

async function getTaskById(req, res) {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId).catch((error) =>
      res.status(301).json({ error: error }).end()
    );
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
  }
}
async function getStatusById(req, res) {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId).catch((error) =>
      res.status(301).json({ error: error }).end()
    );
    res.status(200).json({ status: task.status });
  } catch (error) {
    console.error(error);
  }
}

async function deleteTaskById(req, res) {
  try {
    const taskId = req.params.id;
    await Task
      .findByIdAndRemove(taskId)
      .then(res.status(200).json({ message: "item removed succefully" }))
      .catch((error) => res.status(301).json({ error: error }));
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  addTask,
  doneTask,
  getTaskById,
  getStatusById,
  deleteTaskById,
};
