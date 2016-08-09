let logger = require(`${process.cwd()}/server/utils/logger`);
// get an instance of the model of our db
let model = require('../model');

let bcrypt = require('bcrypt');
const saltRounds = 10;

exports.checkPwd = function(req, res, next) {
    logger.log("--- LOGIN CONTROLLER : checkPwd");
    let hash = req.query.hash;
    let pwd = req.query.pwd;
    logger.log(hash);
    logger.log(pwd);

    bcrypt.compare(pwd, hash, function(err, check) { 
        let result = {
            status : true,
            data: check     // "true" if pwd corresponding to hash or "false" if not
        };
        if (err) {
            result.status = false;
            result.data = err;
        }
        logger.log(result);
        res.json(result);
    });
};