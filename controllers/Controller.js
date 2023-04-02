const Model = require("../models/model");

async function addData(req, res) {
  try {
    const data = new Model({
      name: req.body.name,
      age: req.body.age,
    });
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAll(req, res) {
  try {
    const data = await Model.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getOne(req, res) {
  try {
    const data = await Model.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function updateById(req, res) {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const options = { new: true };
    const result = await Model.findByIdAndUpdate(id, updateData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteById(req, res) {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { addData, getAll, getOne, updateById, deleteById };
