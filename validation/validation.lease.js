var leaseModel        = require('../model/model.lease');
var Q = require('q');
var table = require('./validation.tableschema');

module.exports.ValidateRequest = function(request){

    var deferred = Q.defer();
    var errors = [];
    var leasemodel = {};
    
    table.GetTableColumns('Lease')
    .then(function(result){
        for (row in result){
            leasemodel[result[row].Field] = '';
        }
        for (prop in request.body) {

            if (typeof(leasemodel[prop]) === "undefined"){
                errors.push({
                    "type"  : "validation.lease.ValidateRequest",
                    "msg"   : "Invalid request parameter",
                    "value" : prop
                })
            }
        }

        if(request.body.startDate){
            request.checkBody("startDate", "Invalid date.").isDate({format: 'YYYY-MM-DD'});
        }
        
        if(request.body.leaseDate){
            request.checkBody("leaseDate", "Invalid date.").isDate({format: 'YYYY-MM-DD'});
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

    })
    .catch(function(error){
        deferred.reject({status:500, error});
    });

    return deferred.promise;
}

console.log('Loaded validation.student.js');