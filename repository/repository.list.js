var mysql       = require('mysql');
var config      = require('../config.json');
var Q           = require('q');
var pool        = mysql.createPool(config.dbConfig);

module.exports.GetLists = function() {
    var deferred = Q.defer();

    var sql = "SELECT * FROM List"
         
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

console.log('Loaded repository.list.js');