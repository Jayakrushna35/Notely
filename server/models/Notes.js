const mongoose = require("mongoose");
const { Schema } = mongoose; // Import Schema from Mongoose

const NotesSchema = new Schema({
   user: {
    type: Schema.ObjectId,
    ref: 'User'
   },
   title: {
    type: String,
    required: true,
   },
   body: {
    type: String,
    required: true,
   },
   createdAt: {
    type: Date,
    default: Date.now(),
   },
});

module.exports = mongoose.model("Note", NotesSchema);