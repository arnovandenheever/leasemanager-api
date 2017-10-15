var mysql       = require('mysql');
var config      = require('../config.json');
var Q           = require('q');
var pool        = mysql.createPool(config.dbConfig);

module.exports.GetHouses = function() {
    var deferred = Q.defer();

    var sql = "SELECT * FROM House"
         
    pool.query(sql,function(error,result){
        if(!error) {
            if (result.length > 0){
                deferred.resolve(result);
            } else {
                deferred.resolve(null);
            }
        } else {
            deferred.reject(error);      
        }           
    });

    return deferred.promise;

}