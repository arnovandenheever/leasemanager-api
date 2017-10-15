var transactionModel        = require('../model/model.transaction');
var Q = require('q');

module.exports.ValidateRequest = function(request){

    var deferred = Q.defer();

    var errors = [];
    var transactionmodel = new transactionModel;

    for (prop in request.body) {
        if (typeof(transactionmodel[prop]) === "undefined"){
            errors.push({
                "type"  : "validation.transaction.ValidateRequest",
                "msg"   : "Invalid request parameter",
                "value" : prop
            })
        }
    }

    if(request.body.transactionDate){
        request.checkBody("transactionDate", "Invalid date.").isDate({format: 'YYYY-MM-DD'});
    }

    if(request.body.leaseId === undefined){
        errors.push({
            "type"  : "validation.transaction.ValidateRequest",
            "msg"   : "Missing parameter",
            "value" : "leaseId"
        })
    }   

    if(request.body.transactionDate === undefined){
        errors.push({
            "type"  : "validation.transaction.ValidateRequest",
            "msg"   : "Missing parameter",
            "value" : "transactionDate"
        })
    }

    if(request.body.transactionType === undefined){
        errors.push({
            "type"  : "validation.transaction.ValidateRequest",
            "msg"   : "Missing parameter",
            "value" : "transactionType"
        })
    }      

    if(request.body.reference === undefined){
        errors.push({
            "type"  : "validation.transaction.ValidateRequest",
            "msg"   : "Missing parameter",
            "value" : "reference"
        })
    }  

    if(request.body.debit === undefined || request.body.debit < 0 || request.body.debit === ''){
        errors.push({
            "type"  : "validation.transaction.ValidateRequest",
            "msg"   : "Missing or invalid parameter",
            "value" : "debit: " + request.body.debit
        })
    }

    if(request.body.credit === undefined || request.body.credit < 0 || request.body.credit === ''){
        errors.push({
            "type"  : "validation.transaction.ValidateRequest",
            "msg"   : "Missing parameter",
            "value" : "credit"
        })
    }   

    if(request.validationErrors()){
        request.validationErrors().forEach(function(arrayItem){
            errors.push({
                "type"  : "validation.lease.ValidateRequest",
                "msg"   : arrayItem["msg"],
                "value" : arrayItem["value"]
            })
        });
    }

    if (errors.length === 0) {
        deferred.resolve();
    } else {
        deferred.reject({status:400, errors});
    }

    return deferred.promise;
}

console.log('Loaded validation.student.js');