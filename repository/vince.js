/**
 * Created by vincent on 2017/03/06.
 */

//
// An implementation of the Repository pattern in Javascript.
//
// This implementation abstracts away the code needed to talk
// to a MySQL database and allows the implementation of the database
// code to be varied independently of the models.
//

//
// Import the MySQL connector code
//
var MySQL = require('mysql');
var Q = require('q');
var Customer = require('./Customer.js');
//
// Create a repository that points to the specified
// database on the specified host, and uses the specified
// user name and password to connect.
//
function Repository(hostName, databaseName, userName, password)
    {
    this.hostName = hostName;
    this.databaseName = databaseName;
    this.userName = userName;
    this.password = password;
    this.connect();
    }
//
// Connect the repository to the database.
// Throw if there was an error
//
Repository.prototype.connect = function ()
    {
    this.connection = MySQL.createConnection(this.connectionParameters());
    this.connection.connect(function (error)
    {
    if (!error)
        {
        console.log("connected to database");
        }
    else
        {
        console.log("connection to database failed");
        console.log(error);
        throw(error);
        }
    });
    };
//
// Return an object describing the connection patameters
// needed to create a connection
//
Repository.prototype.connectionParameters = function ()
    {
    return ({host: this.hostName, user: this.userName, password: this.password, database: this.databaseName});
    }
//
// Create a record in the database for the passed
// in customer. On successful insertion, set the id
// of the customer to the id of the record.
// Return a promise with either the customer that was
// created in the database or with the error.
//
Repository.prototype.createCustomer = function (customer)
    {
    // Note that we need to look up the connection here and
    // store it in a local variable because the this inside the
    // promise refers to the promise not the repository.
    var connection = this.connection;
    var promise = Q.promise(function (resolve, reject, notify)
    {
    var handler = function (error, results)
        {
        if (error)
            {
            console.log(error);
            reject(error);
            }
        else
            {
            customer.id = results.insertId;
            console.log("successfully created a new customer with id " + customer.id);
            resolve(customer);
            }
        };
    var values = [customer.firstName, customer.lastName, customer.userName, customer.identityNumber];
    connection.query('INSERT INTO Customers(firstName,lastName,userName,identityNumber) VALUES(?,?,?,?);', values, handler);
    });
    return (promise);
    };
//
// Lookup a customer using the id of the customer.
// Return a promise with the customer model if found
// or null if not.
//
Repository.prototype.lookupCustomerById = function (customerId)
    {
    var connection = this.connection;
    var promise = Q.promise(function (resolve, reject, notify)
    {
    var lookupHandler = function (error, results)
        {
        if (error)
            {
            console.log(error);
            reject(error);
            }
        else
            {
            console.log(results);
            if (results.length > 0)
                {
                var customer = new Customer();
                customer.fromRecord(results[0]);
                resolve(customer);
                }
            else
                {
                resolve(null);
                }
            }
        };
    connection.query('SELECT * FROM Customers WHERE customerId = ?', customerId, lookupHandler);
    });
    return (promise);
    };
//
// Lookup a customer by userName
//
Repository.prototype.lookupCustomerByUserName = function (userName)
    {
    var connection = this.connection;
    var promise = Q.promise(function (resolve, reject, notify)
    {
    var lookupHandler = function (error, results)
        {
        if (error)
            {
            console.log(error);
            reject(error);
            }
        else
            {
            console.log(results);
            if (results.length > 0)
                {
                var customer = new Customer();
                customer.fromRecord(results[0]);
                resolve(customer);
                }
            else
                {
                resolve(null);
                }
            }
        };
    connection.query('SELECT * FROM Customers WHERE userName = ?', userName, lookupHandler);
    });
    return (promise);
    };
//
// Update the database with the customer information as defined by the
// passsed in customer object.
//
Repository.prototype.updateCustomer = function (customer)
    {
    var promise = Q.promise(function (resolve, reject, notify)
    {
    var values = [customer.firstName, customer.lastName, customer.userName, customer.identityNumber, customer.id];
    var callback = function (error, result, fields)
        {
        if (error)
            {
            console.error(error);
            reject(error);
            }
        else
            {
            resolve(true);
            }
        };
    this.connection.query("UPDATE Customers SET firstName = ?,lastName = ?,userName = ?,identityNumber = ? WHERE customerId = ?", values, callback);
    });
    return (promise);
    };
//
// Export the Repository "class"
//
module.exports = Repository;

console.log("loaded Repository.js");