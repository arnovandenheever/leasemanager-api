var leaseValidator    = require('../validation/validation.lease');
var lease = require('../repository/repository.lease');
// var Repository = require('../repository/repository')

module.exports.GetLeases = function (req, res) {

    // Repository.Repository(lease.GetLeasesSQL())
    lease.GetLeases()
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

module.exports.GetLeasesByLeaseId = function(req, res) {

    var leaseId = ''

    if(req.param.leaseId) {
        leaseId = req.param.leaseId;
    } else if(req.body.leaseId) {
        leaseId = req.body.leaseId;
    } else if(req.query.leaseId) {
        leaseId = req.query.leaseId;
    }    

    if(leaseId){
        // lease.GetLeasesByLeaseId(leaseId)
        lease.GetLeasesByLeaseId(leaseId)
        .then(function (result) {
            if (result.length>0) {
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
    } else {
        res.send(400, {status:400, message: 'Bad request', type:'Missing parameter'}); 
    }
}
module.exports.GetLeasesByStudentId = function(req, res) {

    var studentId = ''

    if(req.param.studentId) {
        studentId = req.param.studentId;
    } else if(req.body.studentId) {
        studentId = req.body.studentId;
    } else if(req.query.studentId) {
        studentId = req.query.studentId;
    }    

    if(studentId){
        lease.GetLeasesByStudentId(studentId)
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

module.exports.GetLeasesActive = function(req, res) {  

    lease.GetLeasesActive()
    .then(function (result) {
        if (result.length>0) {
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
    
}

module.exports.UpdateLease = function (req, res) {

    leaseValidator.ValidateRequest(req)
    .then(function(){
        lease.GetLeasesByLeaseId(req.body.leaseId)
        .then(function(result){
            if(result.length > 0){
                // lease.UpdateLease(req.body)
                lease.UpdateLease(req.body)
                .then(function (result) {
                    res.status(200);
                    res.send(result);
                })
                .catch(function(error){
                    res.status(400).send({status:400, message: error}); 
                })
            } else {
                var error = [{
                    "type"  : "controller.lease.UpdateLease",
                    "msg"   : "Not found (leaseId: " + req.body.leaseId + ")",
                    "value" : req.body.leaseId
                }]
                res.status(404).send({status:400, error});
            }
        })
        .catch(function(error){
            res.status(400).send({status:400, message: error});    
        })
    })  
    .catch(function(error){
        res.status(400).send({status:400, message: error});    
    })

}


module.exports.InsertLease = function (req, res) {
    leaseValidator.ValidateRequest(req)
    .then(function(){
        lease.GetLeasesByStudentId(req.body.studentId)
        .then(function(result){
            if(result.length > 0){
                lease.InsertLease(req.body)
                .then(function(result){
                    res.status(200);
                    res.send(result);
                })
                .catch(function(error){
                    res.status(400).send({status:400, message: error}); 
                })
            } else {
                var error = [{
                    "type"  : "controller.lease.InsertLease",
                    "msg"   : "Not found (studentId: " + req.body.studentId + ")",
                    "value" : req.body.leaseId
                }]
                res.status(404).send({status:400, error});
            }
        })
        .catch(function(error){
            res.status(400).send({status:400, message: error}); 
        })
    })
    .catch(function(error){
        res.status(400).send({status:400, message: error}); 
    })
}

console.log('Loaded controller.lease.js');