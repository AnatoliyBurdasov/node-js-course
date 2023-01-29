const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  job: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
