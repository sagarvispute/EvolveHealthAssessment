const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const contact_controller = require('../controllers/contact.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/getContacts', contact_controller.getContacts);
router.post('/saveContact', contact_controller.saveContact);
router.post('/updateStatus', contact_controller.statusUpdateContact);
router.post('/updateContact', contact_controller.updateContact);
router.post('/deleteConatcts', contact_controller.deleteConatcts);
module.exports = router;