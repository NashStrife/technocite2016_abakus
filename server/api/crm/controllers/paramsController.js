let logger = require(`${process.cwd()}/server/utils/logger`);
// get an instance of the model of our db
let model = require('../model');

exports.getParams = function(req, res, next) {
    logger.log("--- CONTROLLER : Get Parameters");
    model.Param.find()
    .then(function(docs){
        logger.log(docs);
        res.json(docs);
    });
};

exports.postParams = function(req, res, next) {
    logger.log("--- CONTROLLER : Post Parameters");
    
    // clean parameters to avoid having a list with different parameters
    logger.log('Clean Parameters...')
    model.Param.remove().exec();

    let parameter = new model.Param(req.body);
    logger.log('New Parameters :')
    logger.log(parameter);
    parameter.save(function(err, data) {
        if (err) {
            res.json({error_code:1,err_desc:err});
            logger.log(err);    
            return;
        }
        res.json({error_code:0,message: 'Parameters saved'});
        logger.log('Parameters saved');
    });
};