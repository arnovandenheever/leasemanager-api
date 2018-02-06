var BankValidator    = require('../validation/validation.bank');
var Bank = require('../repository/repository.bank');
var Repository = require('../repository/repository')

module.exports.GetBank = function (req, res) {

    // repo = new Repository;

    Repository(Bank.GetBank())()

    // Bank.GetBank()
    .then(function (result) {
        if (result.length > 0) {
            res.status(200);
            res.send(result);
        } else {
            res.status(200);
            res.json({});
        }
    })
    .catch(function (error) {
        res.status(400).send({status:400, message: error}); 
    });
}

module.exports.GetBankByAccountNumber = function (req, res) {

    var accountNumber = ''

    if(req.param.accountNumber) {
        accountNumber = req.param.accountNumber;
    } else if(req.body.accountNumber) {
        accountNumber = req.body.accountNumber;
    } else if(req.query.accountNumber) {
        accountNumber = req.query.accountNumber;
    }      

    Bank.GetBankByAccountNumber(accountNumber)
    .then(function (result) {
        if (result) {
            res.status(200);
            res.send(result);
        } else {
            res.status(200);
            res.json({});
        }
    })
    .catch(function (error) {
        if (error.message) {
            res.status(400).send({status:400, message: error.message}); 
        } else {
            res.status(400).send({status:400, message: error}); 
        }
    });
}

module.exports.UpdateBank = function (req, res) {
    BankValidator.ValidateRequest(req)
    .then(function(){
        return Bank.GetBankByBankId(req.body.bankId)})
    .then(function(result){
        return Bank.UpdateBank(req.body)})
    .then(function (result) {
        res.status(200);
        res.send(result);})
    .catch(function(error){
        res.status(400).send({status:400, message: error}); 
    })

}

module.exports.InsertBank = function (req, res) {
    BankValidator.ValidateRequest(req)
    .then(function(){
        Bank.InsertBank(req.body)
        .then(function (result) {
            res.status(200);
            res.send(result);
        })
        .catch(function(error){
            res.status(400).send({status:400, message: error}); 
        })
    })  
    .catch(function(error){
        res.status(400).send({status:400, message: error});    
    })
}

console.log('Loaded controller.bank.js');