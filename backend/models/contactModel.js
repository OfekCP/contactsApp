const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    contactName: {
        type: String,
    },
    phoneNum: {
        type: String,
    },
    contactEmail: {
        type: String,
    },
    avatar: {
        type: String, 
    },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;