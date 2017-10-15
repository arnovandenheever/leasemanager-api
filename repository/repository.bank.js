var mysql       = require('mysql');
var config      = require('../config.json');
var Q           = require('q');
var bankpool        = mysql.createPool(config.dbConfig);

module.exports.GetBank = function (){
    var deferred = Q.defer();

    var sql = "SELECT * from Bank"
    
    bankpool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);
        } else {
            deferred.reject(error);  
        }           
    });

    return deferred.promise;

}


module.exports.GetBankByBankId = function(bankId) {

    var deferred = Q.defer();

    var sql = "SELECT * from Bank WHERE bankId = " + bankId
    
    bankpool.query(sql,function(error,result){
        if(!error) {
            if(result.length > 0){
                deferred.resolve(result);
            } else {
                deferred.reject("Not found (bankId: " + bankId + ")");
            }
        } else {
            deferred.reject(error);  
        }           
    });

    return deferred.promise;

}

module.exports.GetBankByAccountNumber = function(accountNumber) {

    var deferred = Q.defer();

    var sql = "SELECT * from Bank WHERE accountNumber = " + accountNumber
    
    bankpool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);
        } else {
            deferred.reject(error);  
        }           
    });

    return deferred.promise;

}

module.exports.UpdateBank = function(bank) {
    
    var deferred = Q.defer();

    var sql = "UPDATE Bank SET ";
    sql += "journalAccount = '" + bank.journalAccount + "',"

    if(bank.reference){
        sql += "reference = '" + bank.reference + "',"
    }
    sql = sql.slice(0,-1);
    sql += " WHERE bankId = " + bank.bankId
    
    bankpool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);
        } else {
            deferred.reject(error);  
        }           
    });

    return deferred.promise;

}

module.exports.InsertBank = function(bank) {

    var deferred = Q.defer();

    var bankdate = bank.bankDate.substring(0, 10);

    var sql = "INSERT INTO Bank ("
        sql += "accountNumber"
        sql += ",bankDate"
        sql += ",description"
        sql += ",amount"
        sql += ",balance"
        sql += ",fileName"
        sql += ") VALUES ("
        sql += "'" + bank.accountNumber + "'"
        sql += ",'" + bankdate + "'"
        sql += ",'" + bank.description + "'"
        sql += ",'" + bank.amount + "'"
        sql += ",'" + bank.balance + "'"
        sql += ",'" + bank.fileName + "')"
    
    bankpool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);
        } else {
            deferred.reject(error);  
        }           
    });

    return deferred.promise;

}

console.log('Loaded repository.bank.js');