let Company = require('../api/crm/model');

let _ = require('lodash');
let logger = require('./logger');

let bcrypt = require('bcrypt');

const saltRounds = 10;

logger.log('--- SEED : Seeding the Database');

let companies = [{
        "name" : "Ma société",
        "logo" : "logo.png",
        "vat" : {
            "num" : "BE 0214.563.254",
            "siren" : "",
            "rcs" : ""
        },
        "contact" : {
            "street" : "Ma Rue",
            "number" : 1,
            "box" : "",
            "zip" : "1000",
            "town" : "Ma Ville",
            "country" : "Belgique",
            "mail" : "mon.mail@gmail.com",
            "phoneMain" : "+32 45 256 365",
            "phoneSec" : "+32 24 569 874",
            "fax" : "071 25 96 78",
            "web" : "http://www.monsite.be"
        },
        "contactPerson" : {
            "civility" : "Monsieur",
            "firstname" : "John",
            "lastname" : "Doe",
            "post" : "Gérant",
            "mail" : "john.doe@gmail.com",
            "phoneMain" : "+32 493 452 365",
            "phoneSec" : "",
            "pwd" : "pass123",
        },
        "paymentInfo" : {
            "bank" : [
                {
                    "name" : "Belfius Account",
                    "iban" : "BE02589674859",
                    "bic" : "AFR"
                },
                {
                    "name" : "Fortis Account",
                    "iban" : "BE250650879685",
                    "bic" : "DCF"
                }
            ],
            "paypal" : [
                {
                    "name" : "Paypal 01",
                    "mail" : "mail@gmail.com"
                }
            ]
        },
        "templates" : {
            "bill" : 1,
            "quotation" : 1
        },
        "createdAt" : Date.now()
    }];

let customers = [
    {
        "name" : "Sébastien Jacques",
        "picture" : "",
        "isCompany" : false, 
        "vat" : {
            "num" : "",
            "siren" : "",
            "rcs" : ""
        },
        "billingInfo" : {
            "civility" : "Monsieur",
            "firstname" : "Sébastien",
            "lastname" : "Jacques",
            "street" : "Rue Albert Bodson",
            "number" : 38,
            "box" : "",
            "zip" : "6280",
            "town" : "Gerpinnes",
            "country" : "Belgique",
            "mail" : "jac.sebastien@gmail.com",
            "phoneMain" : "0493 17 24 69",
            "phoneSec" : "",
            "fax" : ""
        },
        "deliveryInfo" : {
            "civility" : "Monsieur",
            "firstname" : "Sébastien",
            "lastname" : "Jacques",
            "company" : "",
            "street" : "Rue Albert Bodson",
            "number" : 38,
            "box" : "",
            "zip" : "6280",
            "town" : "Gerpinnes",
            "country" : "Belgique"
        },
        "contactPerson" : {
            "civility" : "Monsieur",
            "firstname" : "Sébastien",
            "lastname" : "Jacques",
            "post" : "",
            "mail" : "jac.sebastien@gmail.com",
            "phoneMain" : "0493 17 24 69",
            "phoneSec" : "",
            "pwd" : "pass123"
        },
        "bills" : [
            {
                "link" : "20160629-01001",
                "state" : true,
                "quotation_id" : 0,
                "createdAt" : "2016-06-29",
                "deadline" : "2016-07-10",
                "payedAt" : "2016-06-31"
            }
        ], 
        "quotations" : [
            {
                "link" : "20160621-01001",
                "state" : true,
                "createdAt" : "2016-06-21"
            },{
                "link" : "20160408-01001",
                "state" : false,
                "createdAt" : "2016-04-08"
            }
        ], 
        "memo" : "Le premier client",
        "createdAt" : Date.now()
    },{
        "name" : "Blizzard",
        "picture" : "",
        "isCompany" : true, 
        "vat" : {
            "num" : "BE 0851.968.717",
            "siren" : "",
            "rcs" : ""
        },
        "billingInfo" : {
            "civility" : "",
            "firstname" : "",
            "lastname" : "",
            "street" : "Beechavenue",
            "number" : 131,
            "box" : "D",
            "zip" : "1119 RB",
            "town" : "Schiphol-Rijk",
            "country" : "Pays-Bas",
            "mail" : "infos@blizzard.com",
            "phoneMain" : "+32 25 258 963",
            "phoneSec" : "",
            "fax" : ""
        },
        "deliveryInfo" : {
            "civility" : "",
            "firstname" : "",
            "lastname" : "",
            "company" : "",
            "street" : "Beechavenue",
            "number" : 131,
            "box" : "D",
            "zip" : "1119 RB",
            "town" : "Schiphol-Rijk",
            "country" : "Pays-Bas"
        },
        "contactPerson" : {
            "civility" : "Monsieur",
            "firstname" : "Bart",
            "lastname" : "Smith",
            "post" : "Management",
            "mail" : "bartsmith@blizzard.com",
            "phoneMain" : "+32 254 896 456",
            "phoneSec" : "",
            "pwd" : "pass123"
        },
        "bills" : [
            {
                "link" : "20160425-01002",
                "state" : true,
                "quotation_id" : 0,
                "createdAt" : "2016-04-25",
                "deadline" : "2016-05-10",
                "payedAt" : "2016-04-31"
            },{
                "link" : "20160512-01002",
                "state" : false,
                "quotation_id" : 1,
                "createdAt" : "2016-05-12",
                "deadline" : "2016-05-22"
            }
        ], 
        "quotations" : [
            {
                "link" : "20160415-01002",
                "state" : true,
                "createdAt" : "2016-04-15"
            },{
                "link" : "20160502-01002",
                "state" : true,
                "createdAt" : "2016-05-02"
            }
        ], 
        "memo" : "Très gros client",
        "createdAt" : Date.now()
    }
];
let params = [{
    "rules" : [
        "Facture payable au grand comptant",
        "Facture payable au comptant"
    ],
    "refunds" : [
        "%",
        "€",
        "$",
        "£"
    ],
    "countries" : [
        "Belgique",
        "Pays-Bas",
        "Luxembourg",
        "France",
        "Allemange",
        "Angleterre",
        "Etats-Unis"
    ],
    "vatRate" : ["0%","6%", "21%"]
}]


companies.map(function(company){
    logger.log("--- SEED : Crypting Pwd");
    company.contactPerson.pwd = bcrypt.hashSync(company.contactPerson.pwd, saltRounds);
    // logger.log(customer.contactPerson.pwd);
});

customers.map(function(customer){
    logger.log("--- SEED : Crypting Pwd");
    customer.contactPerson.pwd = bcrypt.hashSync(customer.contactPerson.pwd, saltRounds);
    // logger.log(customer.contactPerson.pwd);
});


// add elements to the db merging the model with data created before
var createDoc = function(model, doc) {
    logger.log("--- SEED : Creating Doc");
    // use the promise to manage what we do after
    return new Promise(function(resolve, reject) {
        // prepare data in function of the model and save it into the db
        new model(doc).save(function(err, saved) {
            // if errors send it and stop the process thanx to the reject from the promise
            // else save the doc
            return err ? reject(err) : resolve(saved);
        });
    });
};

// creation of a clean method to clean the db each time we launch the application to avoid having too many data inside the db
var cleanDB = function() {
    logger.log('--- SEED : Cleaning the DB');
    // clean thx to the model imported at the begining of the file
    var cleanPromises = [Company]
        // list all resto corresponding to the model
        .map(function(model) {
            // and remove it
            var remove = model.remove().exec();
            remove.customers = model.Customer.remove().exec();
            remove.params = model.Param.remove().exec();
            return remove;
        });
    // when all promises corresponding to "cleanPromises are done, the function is finished
    return Promise.all(cleanPromises);
};

// function to create new Company
var createCompanies = function(data) {
    logger.log("--- SEED : Creating Company");
    // new promise
    var promises = companies.map(function(company) {
        // create thx to the function created before, merging the model [Resto] to the data [resto]
        return createDoc(Company, company);
    });

    // when all promises corresponding to "promises" are done
    return Promise.all(promises)
        // then do the next step
        .then(function(companies) {
            // return all data merged thx to lodash
            return _.merge({
                companies: companies
                // or if no data return a void object
            }, data || {});
        });
};

// function to create new Customers
var createCustomers = function(data) {
    logger.log("--- SEED : Creating Customer");
    // new promise
    var promises = customers.map(function(customer) {
        // create thx to the function created before, merging the model [Resto] to the data [resto]
        return createDoc(Company.Customer, customer);
    });

    // when all promises corresponding to "promises" are done
    return Promise.all(promises)
        // then do the next step
        .then(function(customers) {
            // return all data merged thx to lodash
            return _.merge({
                customers: customers
                // or if no data return a void object
            }, data || {});
        });
};

// function to create new Params
var createParams = function(data) {
    logger.log("--- SEED : Creating Params");
    // new promise
    var promises = params.map(function(param) {
        // create thx to the function created before, merging the model [Resto] to the data [resto]
        return createDoc(Company.Param, param);
    });

    // when all promises corresponding to "promises" are done
    return Promise.all(promises)
        // then do the next step
        .then(function(params) {
            // return all data merged thx to lodash
            return _.merge({
                params: params
                // or if no data return a void object
            }, data || {});
        });
};

// each time we clean the db, then create new one with default data

cleanDB()
    .then(createCompanies)
    .then(logger.log.bind(logger))
    .catch(logger.log.bind(logger))
    .then(createCustomers)
    .then(logger.log.bind(logger))
    .catch(logger.log.bind(logger))
    .then(createParams)
    .then(logger.log.bind(logger))
    .catch(logger.log.bind(logger));