var mysql       = require('mysql');
var config      = require('../config.json');
var Q           = require('q');
var pool        = mysql.createPool(config.dbConfig);

module.exports.GetTableColumns = function(table){

    var deferred = Q.defer();

    var sql = 'SHOW COLUMNS FROM ' + table;
    
    pool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);
        } else {
            deferred.reject(error);  
        }           
    });

    return deferred.promise;

}

console.log("loaded Repository.js");