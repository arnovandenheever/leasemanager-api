var bcrypt      = require('bcryptjs')
var jwt         = require('jsonwebtoken');
var _           = require('underscore');
var mysql       = require('mysql');
var config      = require('../config.json');
var Q           = require('q');
var userpool        = mysql.createPool(config.dbConfig);

module.exports.GetUsers = function() {
    var deferred = Q.defer();

    var sql = "SELECT * FROM User"
         
    userpool.query(sql,function(error,result){
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

};

module.exports.GetUserByUserId = function(userId) {
    var deferred = Q.defer();

    var sql = "SELECT * FROM User WHERE userId = " + userId
         
    userpool.query(sql,function(error,result){
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

};

module.exports.GetUserByEmail = function(email) {

    var deferred = Q.defer();

    var sql = "SELECT * FROM User WHERE email = '" + email + "'"
         
    userpool.query(sql,function(error,result){
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

};

module.exports.Register = function(user) {
    var deferred = Q.defer();

    var hash = bcrypt.hashSync(user.password, 10);

    var sql = "INSERT INTO User (userName, userType, email, password) VALUES "
        sql += "('" + user.userName + "', '" + user.userType + "', '" + user.email + "', '" + hash + "')"
        
    userpool.query(sql,function(error,result){
        if(!error) {
            var authRes = {};
            console.log(result);
            user.userId = result.insertId.toString();
            authRes.result = 'success';
            authRes.token = GetToken(user)
            deferred.resolve(authRes);
        } else {
            deferred.reject(error);      
        }           
    });

    return deferred.promise;

}

module.exports.ValidatePassword = function(password,user) {
    var deferred = Q.defer();
    var authRes = {};

    if (bcrypt.compareSync(password, user[0].password)) {
        authRes.result = 'success';
        authRes.token = GetToken(user[0]);
    } else {
        authRes.result = 'failed';
        authRes.message = 'Invalid password!'
    }
    deferred.resolve(authRes);

    return deferred.promise;
}

function GetToken(user){

    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);

    var token =  jwt.sign({
                    userid: user.userId,
                    name: user.userName,    
                    usertype: user.userType,                           
                    email: user.email,
                    exp: parseInt(expiry.getTime() / 1000),
                }, config.secret); 

    return token;
}

console.log('Loaded repository.user.js');