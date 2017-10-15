var bankModel        = require('../model/model.bank');
var Repository = require('../repository/repository');
var Q = require('q');

module.exports.ValidateRequest = function(request){

    var deferred = Q.defer();

    var errors = [];
    var bankmodel = new bankModel;

    // Repository.Repository('SHOW COLUMNS FROM Bank')
    // .then(function(results){
    //     for (prop in request.body) {
    //         console.log(results.rows[row].Field);
    //     }
    // })
    // .catch(function(error){
    //     console.log(error);
    // })

    for (prop in request.body) {
        if (typeof(bankmodel[prop]) === "undefined"){
            errors.push({
                "type"  : "validation.lease.ValidateRequest",
                "msg"   : "Invalid request parameter",
                "value" : prop
            })
        }
    }

    if(request.body.bankDate){
        request.checkBody("bankDate", "Invalid date.").isDate({format: 'YYYY-MM-DD'});
    }

    if(request.validationErrors()){
        request.validationErrors().forEach(function(arrayItem){
            errors.push({
                "type"  : "validation.bank.ValidateRequest",
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

console.log('Loaded validation.bank.js');