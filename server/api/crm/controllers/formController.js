let logger = require(`${process.cwd()}/server/utils/logger`);
// get an instance of the model of our db
let model = require('../model');
let multer = require('multer');
let fsPath = require('fs-path');

const dest_folder = 'public/images/uploads/';

// =============================================================
// /!\ THE TEXT FIELDS MUST BE SEND BEFORE THE IMAGE FIELDS !!!!
// =============================================================
// Destination folder : req.body.folder
// File name : req.body.filename

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        // logger.log("--- FORM CONTROLLER : storage.destination");
        if(req.body.folder) {

            logger.log('Custom folder');
            let destination_path = req.body.folder;
            
            fsPath.mkdir(destination_path, function(err){
                if(err)
                    logger.warn(err)
                else
                    logger.log('Custom folder has been created or already exists');

                cb(null, destination_path);
            });
        } else {
            logger.log('Default folder');
            cb(null, dest_folder);
        }
    },
    filename: function (req, file, cb) {
        // logger.log("--- FORM CONTROLLER : storage.filename");
        cb(null, req.body.filename + '.jpg');
    }
});

var upload = multer({ //multer settings
                storage: storage
            }).single('file'); // req.file is the file named `file` 


exports.uploadImage = function(req, res, next) {
    // req.body will hold the text fields, if there were any
    
    logger.log("--- FORM CONTROLLER : Upload Image");

    upload(req, res, function(err){
        // req.file is the file named `file` [corresponding to the .single() method]
        if(err){
                res.json({error_code:1,err_desc:err});
                logger.warn(err);
                return;
        }

        res.json({error_code:0,err_desc:null});
        logger.log('Image uploaded !');
    });
};