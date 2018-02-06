var mysql       = require('mysql');
var config      = require('../config.json');
var Q           = require('q');
var pool        = mysql.createPool(config.dbConfig);

function Repository(){}

Repository.prototype.ExecuteQuery = function (sql){
    var deferred = Q.defer();
    
    pool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);
        } else {
            deferred.reject(error);  
        }           
    });

    return deferred.promise;

}

module.exports = Repository;

console.log("loaded Repository.js");