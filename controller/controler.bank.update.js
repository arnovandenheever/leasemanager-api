var BankValidator    = require('../validation/validation.bank');
var Bank = require('../repository/repository.bank');

module.exports.UpdateBank = function (req, res) {

    var getBank = function(req){
        return Bank.GetBankByBankId(req.body.bankId)
    }

    var updateBank = function(bank){
        if(bank.length > 0){
            Bank.UpdateBank(req.body)
            .then(function (result) {
                res.status(200);
                res.send(result);
            })
            .catch(function(error){
                res.status(400).send({status:400, message: error}); 
            })
        } else {
            var errors = [{
                "type"  : "controller.bank.UpdateBank",
                "msg"   : "Not found (bankId: " + req.body.bankId + ")",
                "value" : req.body.bankId
            }]
            res.status(404).send({status:404, errors});
        }

    }

    function responseError(error) {
        res.status(400).send({status:400, message: error});    
    }

    return BankValidator.ValidateRequest(bank)
            .then(getBank)
            .then(updateBank(result))
            .catch(responseError(error))

}

module.exports.UpdateBank = function (req, res) {
    BankValidator.ValidateRequest(req)
    .then(function(){
        Bank.GetBankByBankId(req.body.bankId)
    })
    .then(function(result){
        if(result.length > 0){
            Bank.UpdateBank(req.body)
            .then(function (result) {
                res.status(200);
                res.send(result);
            })
            .catch(function(error){
                res.status(400).send({status:400, message: error}); 
            })
        } else {
            var errors = [{
                "type"  : "controller.bank.UpdateBank",
                "msg"   : "Not found (bankId: " + req.body.bankId + ")",
                "value" : req.body.bankId
            }]
            res.status(404).send({status:404, errors});
        }
    })
    .catch(function(error){
        res.status(400).send({status:400, message: error});    
    })
}