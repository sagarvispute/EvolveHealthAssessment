const Contact = require('../models/contact.model');
var mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/contact", { useNewUrlParser: true }, function(err) {
    if(err) return console.error(err);
    console.log('Database conectiom established...')
});

//Get all contacts
exports.getContacts = function (req, res) {
    Contact.find(function (err, contact) {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Contacts fetched successfully', 'data': contact });
    })
};

//Save new contact
exports.saveContact = (req, res) => {
    const newContact = new Contact(req.body);
    newContact.save(function (err, contact) {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Contact Added successfully', 'data': contact });
    })
}

//State update contact
exports.statusUpdateContact = function (req, res) {
    Contact.update({ _id: { $in: req.body['ids']}}, { $set: {"status": req.body['status']}}, { multi: true },function (err, contact) {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Contacts deleted successfully' });
    })
};

//State update contact
exports.updateContact = function (req, res) {
    Contact.findByIdAndUpdate({_id: req.body['_id']}, {
        "firstName": req.body['firstName'],
        "lastName": req.body['lastName'],
        "contact": req.body['contact'],
        "email": req.body['email']
    }, {new: true}, function (err, contact) {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Contacts update successfully' });
    })
};

//Delete existing contact
exports.deleteConatcts = function (req, res) {
    Contact.deleteMany({ _id: { $in: req.body['ids'] } },function (err, contact) {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Contacts deleted successfully' });
    })
};