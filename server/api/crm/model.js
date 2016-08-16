let mongoose = require('mongoose');
let validate = require('mongoose-validator');
let logger = require(`${process.cwd()}/server/utils/logger`);

// define some condition for one validator thx to mongoose-validator
// let stringValidator = [
//     validate({
//         validator: 'isLength',
//         arguments: [3, 50],
//         message: '{VALUE} should be between {ARGS[0]} and {ARGS[1]} characters'
//     })
// ];

let numberValidator = [
    validate({
        validator : "isNumeric",
        message : "{VALUE} should be a numeric value"
    })
];

let dateValidator = [
    validate({
        validator : "isDate",
        message : "Date should be in a Date format"
    })
];

let urlValidator = [
    validate({
        validator : "isURL",
        message : "The url is not valid"
    })
];

// creation of the model of the db
let companyModel = function() {
    // new Schema with definition of the data
    let Customer = mongoose.Schema({
            name : {
                type : String,
                required : true,
                lowercase : true
            },
            picture : {
                type : String
            },
            isCompany : {
                type : Boolean,
                required : true
            },
            vat : {
                num : {
                    type : String
                },
                siren : {
                    type : String
                },
                rcs : {
                    type : String
                }
            },
            billingInfo : {
                civility : {
                    type : String
                },
                firstname : {
                    type : String,
                    lowercase : true
                },
                lastname : {
                    type : String,
                    lowercase : true
                },
                street : {
                    type : String,
                    required : true,
                    lowercase: true
                },
                number : {
                    type : Number,
                    required : true,
                    validate : numberValidator
                },
                box : {
                    type : String
                },
                zip : {
                    type : String,
                    required : true
                },
                town : {
                    type : String,
                    required : true,
                    lowercase: true
                },
                country : {
                    type : String,
                    required : true,
                    lowercase: true
                },
                mail : {
                    type : String,
                    required : true,
                    lowercase : true
                },
                phoneMain : {
                    type : String,
                    required : true
                },
                phoneSec : {
                    type : String
                },
                fax : {
                    type : String
                }
            },
            deliveryInfo : {
                civility : {
                    type : String
                },
                firstname : {
                    type : String,
                    lowercase : true
                },
                lastname : {
                    type : String,
                    lowercase : true
                },
                company : {
                    type : String,
                    lowercase : true
                },
                street : {
                    type : String,
                    required : true,
                    lowercase: true
                },
                number : {
                    type : Number,
                    required : true,
                    validate : numberValidator
                },
                box : {
                    type : String
                },
                zip : {
                    type : String,
                    required : true
                },
                town : {
                    type : String,
                    required : true,
                    lowercase: true
                },
                country : {
                    type : String,
                    required : true,
                    lowercase: true
                }
            }, 
            contactPerson : {
                civility : {
                    type : String,
                    required : true
                },
                firstname : {
                    type : String,
                    required : true,
                    lowercase : true
                },
                lastname : {
                    type : String,
                    required : true,
                    lowercase : true
                },
                post : {
                    type : String,
                    lowercase : true
                },
                mail : {
                    type : String,
                    required : true,
                    lowercase : true
                },
                phoneMain : {
                    type : String,
                    required : true
                },
                phoneSec : {
                    type : String
                },
                pwd : {
                    type : String,
                    required : true
                }
            },
            bills : [{
                link : {
                    type : String,
                    required : true
                },
                state : {
                    type : Boolean,
                    required : true
                },
                quotation_id : {
                    type : Number,
                    validate : numberValidator
                },
                createdAt : {
                    type : Date,
                    required : true,
                    validate : dateValidator
                },
                deadLine : {
                    type : Date,
                    validate : dateValidator
                },
                payedAt : {
                    type : Date,
                    validate : dateValidator
                }
            }],
            quotations : [{
                link : {
                    type : String,
                    required : true
                },
                state : {
                    type : Boolean,
                    required : true
                },
                createdAt : {
                    type : Date, 
                    required : true,
                    validate : dateValidator
                }
            }],
            memo : {
                type : String
            },
            createdAt : {
                type : Date,
                required : true,
                validate : dateValidator
            },
            updatedAt : {
                type : Date,
                default : Date.now,
                validate : dateValidator
            }
    });

    // Customer.virtual('fullname').get(function(){
    //     return this.billingInfo.firstname + ' ' + this.billingInfo.lastname;
    // });

    let Company = mongoose.Schema({
            name : {
                type : String,
                required : true,
                lowercase : true
            },
            logo : {
                type : String
            },
            vat : {
                num : {
                    type : String,
                    required : true
                },
                siren : {
                    type : String
                },
                rcs : {
                    type : String
                }
            },
            contact : {
                street : {
                    type : String,
                    required : true,
                    lowercase: true
                },
                number : {
                    type : Number,
                    required : true,
                    validate : numberValidator
                },
                box : {
                    type : String
                },
                zip : {
                    type : String,
                    required : true
                },
                town : {
                    type : String,
                    required : true,
                    lowercase: true
                },
                country : {
                    type : String,
                    required : true,
                    lowercase: true
                },
                mail : {
                    type : String,
                    required : true,
                    lowercase : true
                },
                phoneMain : {
                    type : String,
                    required : true
                },
                phoneSec : {
                    type : String
                },
                fax : {
                    type : String
                },
                web : {
                    type : String,
                    validate : urlValidator
                }
            }, 
            contactPerson : {
                civility : {
                    type : String,
                    required : true
                },
                firstname : {
                    type : String,
                    required : true,
                    lowercase : true
                },
                lastname : {
                    type : String,
                    required : true,
                    lowercase : true
                },
                post : {
                    type : String,
                    lowercase : true
                },
                mail : {
                    type : String,
                    required : true,
                    lowercase : true
                },
                phoneMain : {
                    type : String,
                    required : true
                },
                phoneSec : {
                    type : String
                },
                pwd : {
                    type : String,
                    required : true
                }
            },
            paymentInfo : {
                bank : [{
                    name : {
                        type : String,
                        required : true
                    },
                    iban : {
                        type : String,
                        required : true
                    },
                    bic : {
                        type : String
                    }
                }],
                paypal : [{
                    name : {
                        type : String
                    },
                    mail : {
                        type : String
                    }
                }]
            },
            templates : {
                bill : {
                    type : Number,
                    validate : numberValidator
                },
                quotation : {
                    type : Number,
                    validate : numberValidator
                },
                rule : {
                    type : String
                }
            },
            terms : {
                type : String
            },
            articles : [{
                name : {
                    type : String
                },
                description : {
                    type : String
                },
                unitPrice : {
                    type : Number,
                    validate : numberValidator
                }
            }],
            createdAt : {
                type : Date,
                required : true,
                validate : dateValidator
            },
            updatedAt : {
                type : Date,
                default : Date.now,
                validate : dateValidator
            }
    });

    let Param = mongoose.Schema({
        rules : [{
            type : String,
            required : true
        }],
        refunds : [{
            type : String,
            required : true
        }],
        countries : [{
            type : String,
            required : true
        }],
        vatRate : [{
            type : Number,
            required : true,
            validate : numberValidator
        }]
    });

    // we use a hook to say "when you want to save data using the model do this before"
    Customer.pre('save', function(next) {
        // to avoid a scoop problem => this self contain now the data
        var self = this;
        logger.log("--- MODEL : Customer pre-saving Doc")
        // logger.log(self.billingInfo.street);
        // use the find function of the constructor from the model
        this.constructor.find({
            'billingInfo.street': self.billingInfo.street,
            'billingInfo.number': self.billingInfo.number,
            'billingInfo.zip': self.billingInfo.zip,
            'billingInfo.town': self.billingInfo.town,
            'billingInfo.country': self.billingInfo.country
        }, function(err, docs) {
            // if the address is different
            if (!docs.length) {
                next();
            // if the address is the same
            } else {
                next(new Error("customer exists!"));
            }
        });
    });

    var Base = mongoose.model('company', Company, 'companies');
    var exports = module.exports = Base;
    Base.Customer = mongoose.model('customer', Customer, 'customers');
    Base.Param = mongoose.model('param', Param, 'params')
    logger.log(Base);
    // we return the schema type "Company" called "company" for the collection "companies" 
    // return mongoose.model('company', Company,'companies');
    return Base;
};

// export of the model like a singleton [export an instance of the model] so be carefull of the ()
module.exports = new companyModel();