var mysql       = require('mysql');
var config      = require('../config.json');
var Q           = require('q');
var pool        = mysql.createPool(config.dbConfig);

module.exports.GetTransactions = function() {
    var deferred = Q.defer();

    var sql = "SELECT * FROM Transaction"
         
    pool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);
        } else {
            deferred.reject(error);      
        }           
    });

    return deferred.promise;

};

module.exports.GetTransactionsByLeaseId = function(leaseId) {
    var deferred = Q.defer();

    var sql = "SELECT * FROM Transaction  WHERE leaseId = " + leaseId
         
    pool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);

        } else {
            deferred.reject(error);      
        }           
    });

    return deferred.promise;

};

module.exports.GetTransactionsByTransactionId = function(transactionId) {
    var deferred = Q.defer();

    var sql = "SELECT * FROM Transaction  WHERE transactionId = " + transactionId
         
    pool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);

        } else {
            deferred.reject(error);      
        }           
    });

    return deferred.promise;

};

module.exports.InsertTransaction = function(transaction) {
    var deferred = Q.defer();

    var transactiondate = transaction.transactionDate.substring(0, 10);

    var sql = "CALL rentman.InsertTransaction(" 
        sql += transaction.leaseId + ", '" 
        sql += transactiondate + "', '" 
        sql += transaction.transactionType + "', '"
        sql += transaction.reference + "', "
        sql += transaction.debit + ", "
        sql += transaction.credit + ")";
         
    pool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);

        } else {
            deferred.reject(error);      
        }           
    });

    return deferred.promise;

};

module.exports.DeleteTransaction = function(leaseId, transactionId) {
    var deferred = Q.defer();

    var sql = "CALL rentman.DeleteTransaction(" 
        sql += leaseId + "," 
        sql += transactionId + ")";
         
    pool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);

        } else {
            deferred.reject(error);      
        }           
    });

    return deferred.promise;

};


// module.exports.insertTransaction = function(tranParams, callback){
//     var deferred = Q.defer();
    
//         console.log(tranParams.params.LeaseID);
//         console.log(tranParams.params.TranDate);
//         console.log(tranParams.params.TranType);
//         console.log(tranParams.params.Reference);
//         console.log(tranParams.params.Debit);
//         console.log(tranParams.params.Credit);

//     sqlDb.connect(config.dbConfig)
//     .then(function(){
//         var request = new sqlDb.Request();

//         request.input('LeaseID', tranParams.params.LeaseID);
//         request.input('TranDate', tranParams.params.TranDate);
//         request.input('TranType', tranParams.params.TranType);
//         request.input('Reference', tranParams.params.Reference);
//         request.input('Debit', sqlDb.Money, tranParams.params.Debit);
//         request.input('Credit', sqlDb.Money, tranParams.params.Credit);

//         request.execute('spTransactions_Insert', function(err, recordsets, returnValue, affected){
//             if(err){
//                 deferred.reject(err)
//             } else {
//                 console.log('err_' + err);
//                 console.log('recordset_' + recordsets);
//                 console.log('returnValue_' + returnValue);
//                 console.log('affected_' + affected);

//                 deferred.resolve(affected);
//             }
//             sqlDb.close;
//         })

//     })
//     .catch(function(err){
//         deferred.reject(err)
//     })

//     return deferred.promise;
// }


console.log('Loaded repository.transaction.js');