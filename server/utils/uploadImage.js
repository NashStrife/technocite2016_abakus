let logger = require(`${process.cwd()}/server/utils/logger`);
let multer = require('multer');
const dest_folder = 'public/images/uploads/';

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        logger.log("--- UPLOAD IMAGE : storage.destination");
        cb(null, dest_folder);
    },
    filename: function (req, file, cb) {
        logger.log("--- UPLOAD IMAGE : storage.filename");
        console.log(req.body);
        // var datetimestamp = Date.now();
        // define the file name [name from the form-timestamp.extension]
        // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]); 
        cb(null, req.body.filename + '.jpg');
    }
});

let uploadImage = {
    upload: function(req, res, cb) {
        logger.log("--- UPLOAD IMAGE : upload");
        multer({ //multer settings
                storage: storage
            }).single('file'); // req.file is the file named `file` 
    }
}

module.exports = uploadImage;