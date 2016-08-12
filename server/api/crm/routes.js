let router = require('express').Router();
let controller = require('./controllers/controller');
let loginController = require('./controllers/loginController');
let formController = require('./controllers/formController');
let pdfController = require('./controllers/pdfController');

// CUSTOMERS 
router.route('/')
.get(controller.getCustomer)
.post(controller.postCustomer);

// we want dynamic params so we don't use /:search but the old school /search
router.route('/search')
.get(controller.dynamicSearch);

router.route('/:id')
.put(controller.updateCustomer)
.delete(controller.deleteById);

// ADMIN
router.route('/admin')
.get(controller.getAdmin);

router.route('/admin/:id')
.put(controller.updateAdmin);

// PARAMETERS
router.route('/params')
.get(controller.getParams);

// DIVERS
router.route('/login')
.get(loginController.checkPwd);

router.route('/upload')
.post(formController.uploadImage);

router.route('/createPdf')
.post(pdfController.createPdf);


module.exports = router;