const Task = require("../models/taksModel");

async function addTask(req, res) {
  try {
    const { name, dueDate } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Task name is required" });
    }
    const taskObject = {
      title: title,
    };
    if (dueDate !== undefined) {
      taskObject.dueDate = dueDate;
    }
    const newTask = new Task(taskObject);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error, message: "Failed to add Task" });
  }
}

async function editTask(req, res) {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    const { name, dueDate } = req.body;
    if (!name && !dueDate) {
      return res.status(400).json({ error: "Name or dueDate are required" });
    }
    const updateObject = {};
    if (name !== undefined) {
      updateObject.name = name;
    }
    if (dueDate !== undefined) {
      updateObject.dueDate = dueDate;
    }
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateObject, {
      new: true,
    }).catch((error) => {
      res.status(500).json({ error: error, message: "Failed to edit task" });
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error, message: "Failed to edit task" });
  }
}

async function doneTask(req, res) {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status: true },
      { new: true }
    ).catch((error) =>
      res.status(500).json({ error: error, message: "Failed to edit task" })
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error, message: "Failed to edit task" });
  }
}
async function toggleTaskStatus(req, res) {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    let taskStatus;
    await Task.findById(taskId)
      .then((data) => (taskStatus = data.status))
      .catch((error) =>
        res.status(404).json({ error: error, message: "Task not found" })
      );
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status: !taskStatus },
      { new: true }
    ).catch((error) =>
      res
        .status(500)
        .json({ error: error, message: "Faild to toggle task status" })
    );
    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "Failed to toggle Task status" });
  }
}
async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find().catch(() => {
      res.status(500).json({ error: "Faild to get Tasks" });
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error, message: "Failed to get Tasks" });
  }
}
async function getTaskById(req, res) {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    const task = await Task.findById(taskId).catch((error) =>
      res.status(404).json({ error: error, message: "Task not found" })
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error, message: "Failed to get task" });
  }
}
async function getStatusById(req, res) {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    const task = await Task.findById(taskId).catch((error) =>
      res.status(404).json({ error: error, message: "Task not found" })
    );
    res.status(200).json({ status: task.status });
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "Failed to get Task status" });
  }
}

async function deleteTaskById(req, res) {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    await Task.findByIdAndRemove(taskId)
      .then(res.status(200).json({ message: "Item removed succefully" }))
      .catch((error) =>
        res.status(500).json({ error: error, message: "Failed to delete Task" })
      );
  } catch (error) {
    res.status(500).json({ error: error, message: "Failed to delete Task" });
  }
}

module.exports = {
  addTask,
  doneTask,
  getAllTasks,
  getTaskById,
  getStatusById,
  toggleTaskStatus,
  deleteTaskById,
  editTask,
};
