const mongoose = require('mongoose');

const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type:Boolean,
        default: false
    },
    dueDate: Date,
},{timestamps:true})

module.exports = mongoose.model('Task', taskSchema)