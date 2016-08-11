let logger = require(`${process.cwd()}/server/utils/logger`);

let fs = require('fs');
let fsPath = require('fs-path');
let pdf = require('html-pdf');
let Handlebars = require('handlebars');

exports.createPdf = function(req, res, next) {
    logger.log("--- PDF CONTROLLER : Create PDF");

    // store informations about the page to convert
    let file = req.body.file; 
    logger.log(file);

    let source = fs.readFileSync(file.template, 'utf8');    // let source = fs.readFileSync('public/documents/templates/body.hbs', 'utf8');
    // get handlebars template from html
    let template = Handlebars.compile(source);  
    // get data to show inside the pdf
    let data = req.body.data;
    logger.log(data);

    // insert data inside handlebars template
    var html_with_data = template(data);    
    
    logger.log(html_with_data);

    // values for pdf creation
    var options = config = {
        // allowed units: A3, A4, A5, Legal, Letter, Tabloid 
        "format": "A4",        
        // portrait or landscape 
        "orientation": "portrait", 
        
        // default is 0, units: mm, cm, in, px 
        "border": {
            "top": "10px",            
            "right": "10px",
            "bottom": "10px",
            "left": "10px"
        },
        
        // File options 
        "type": "pdf"
    };

    if(file.folder) {
        logger.log('file.folder is defined');
        let destination_path = file.folder;
        logger.log(destination_path);

        fsPath.mkdir(destination_path, function(err){
            if(err){
                logger.warn(err);
                res.json({error_code:1,err_desc:err});
                return;
            }
                
            logger.log('Folder has been created or already exists');
            
            // concatenation of folder, filename and extention
            destination_path += "/" + file.fileName + ".pdf";

            pdf.create(html_with_data, options).toFile(destination_path, function(err) {   //pdf.create(html_with_data, options).toFile('public/tmp/pdf_from_hbs.pdf', function(err) {
                if(err){
                        res.json({error_code:1,err_desc:err});
                        logger.log(err);    
                        return;
                }
                    res.json({error_code:0,data:destination_path});
                    logger.log('PDF Created !');
                    logger.log(destination_path);
            });
        });
    } else {
        res.json({error_code:1,err_desc:'file.folder is not defined'});
    }
}

exports.testPdf = function(req, res, next) {
    
    var html = fs.readFileSync('public/documents/templates/test.hbs', 'utf8');
    var options = { format: 'A4' };
    pdf.create(html, options).toFile('public/tmp/pdf_from_html.pdf', function(err, data) {
        if(err){
                res.json({error_code:1,err_desc:err});
                logger.log(err);    
                return;
        }
            res.json({error_code:0,err_desc:null});
            logger.log('PDF Created on ' + data);
    });
}