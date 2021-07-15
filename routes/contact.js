var express = require('express');
var router = express.Router();
var contactController =require("../controllers/contact");
/* GET home page. */
router.get('/',contactController.getAllContacts);

router.post('/', contactController.addContact);

router.put('/user/:id',contactController.updateUser);
router.put('/email/:id',contactController.updateEmails);
router.put('/phone/:id',contactController.updatePhone);

router.delete('/:id',contactController.removeContact);

router.get('/name/:name',contactController.searchByName);
router.get('/phone/:phone',contactController.searchByPhone);
router.get('/email/:email',contactController.searchByEmail);



module.exports = router;
