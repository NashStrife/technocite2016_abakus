let router = require('express').Router();

router.use('/crm', require('./crm/routes'));

module.exports = router;