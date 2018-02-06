(function(module) {
    var mysql       = require('mysql');
    var config      = require('../config.json');
    var Q           = require('q');
    var pool        = mysql.createPool(config.dbConfig);
    
    module.exports = function (sql){

        return function(){
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
    
    }
    
    console.log("Loaded Repository.js");

})(module);