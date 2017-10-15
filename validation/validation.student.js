var studentModel        = require('../model/model.student');
var Q = require('q');

module.exports.ValidateRequest = function(request){

    var deferred = Q.defer();

    var errors = [];
    var studentmodel = new studentModel;

    for (prop in request.body) {
        if (typeof(studentmodel[prop]) == "undefined"){
            errors.push({
                "type"  : "ValidateRequest.create.student",
                "msg"   : "Invalid request parameter",
                "value" : prop
            })
        }
    }

    // if(request.body.email){
    //     request.checkBody("email", "Invalid email address.").isEmail();
    // } 

    request.checkBody({
        'studentDate': {
            notEmpty: true,
            errorMessage: 'Date required' // Error message for the parameter
        },      
        'studentName': {
            notEmpty: true,
            errorMessage: 'First Name required' // Error message for the parameter
        },
        'surname': {
            notEmpty: true,
            errorMessage: 'Last Name required' // Error message for the parameter
        }, 
        'identityNumber': {
            notEmpty: true,
            errorMessage: 'Identity number required' // Error message for the parameter
        },                
        'email': {
            isEmail: {
            errorMessage: 'Email required'
            }
        },
    });

    if(request.validationErrors()){
        request.validationErrors().forEach(function(arrayItem){
            // console.log(arrayItem)
            errors.push({
                "type"  : "ValidateRequest.create.student.",
                "msg"   : arrayItem["msg"],
                "value" : arrayItem["value"],
                "field" : arrayItem["param"],
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