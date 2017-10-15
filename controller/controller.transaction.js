var transactionValidator    = require('../validation/validation.transaction');
var transaction = require('../repository/repository.transaction');

module.exports.GetTransactionsByLeaseId = function (req, res) {

    var leaseId = ''

    if(req.param.leaseId) {
        leaseId = req.param.leaseId;
    } else if(req.body.leaseId) {
        leaseId = req.body.leaseId;
    } else if(req.query.leaseId) {
        leaseId = req.query.leaseId;
    }

    if(leaseId){
        transaction.GetTransactionsByLeaseId(leaseId)
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
                    res.status(500).send({status:500, message: error.message}); 
                } else {
                    res.status(500).send({status:500, message: error}); 
                }
            });
    } else {
        res.send(400, {status:400, message: 'Bad request', type:'Missing parameter'});   
    }

}

module.exports.GetTransactions = function (req, res) {
    
    transaction.GetTransactions()
    .then(function (result) {
        if (result) {
            res.status(200);
            res.json(result);
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

module.exports.InsertTransaction = function (req, res) {
    
    transactionValidator.ValidateRequest(req)
    .then(function(){
        transaction.InsertTransaction(req.body)
        .then(function (result) {
            if (result) {
                res.status(200);
                res.json(result);
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
    })
    .catch(function(error){
        res.status(400).send({status:400, message: error}); 
    })
}


module.exports.DeleteTransaction = function (req, res) {

    var transactionId = ''

    if(req.param.transactionId) {
        transactionId = req.param.transactionId;
    } else if(req.body.transactionId) {
        transactionId = req.body.transactionId;
    } else if(req.query.transactionId) {
        transactionId = req.query.transactionId;
    }

    if(transactionId){ 
        transaction.GetTransactionsByTransactionId(transactionId)
        .then(function(result){
            if(result.length===1){
            transaction.DeleteTransaction(result[0].leaseId, transactionId)
                .then(function (result) {
                    res.status(200);
                    res.json(result);
                })
                .catch(function (error) {
                    if (error.message) {
                        res.status(400).send({status:400, message: error.message}); 
                    } else {
                        res.status(400).send({status:400, message: error}); 
                    }
                });
            } else {
                res.status(400).send({status:400, message: 'Bad request', type:'Invalid parameter: transactionId not found! (' + transactionId + ')'}); 
            }
        })
        .catch(function(error){
            res.status(400).send({status:400, message: error}); 
        })
    } else {
        res.send(400, {status:400, message: 'Bad request', type:'Missing parameter: transactionId'});   
    }
    
}

console.log('Loaded controller.transaction.js');