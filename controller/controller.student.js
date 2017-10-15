var studentValidator    = require('../validation/validation.student');
var student             = require('../repository/repository.student');

module.exports.GetStudents = function (req, res) {

    student.GetStudents()
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
}

module.exports.GetStudentByStudentId = function(req, res) {

    var studentId = ''

    if(req.param.studentId) {
        studentId = req.param.studentId;
    } else if(req.body.studentId) {
        studentId = req.body.studentId;
    } else if(req.query.studentId) {
        studentId = req.query.studentId;
    }    

    if(studentId){
        student.GetStudentByStudentId(studentId)
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
        res.send(400, {status:400, message:'Missing parameter'}); 
    }
}

module.exports.CreateStudent = function (req, res) {

    studentValidator.ValidateRequest(req)
    .then(function(){
        student.GetStudentByIdentityNumber(req.body.identityNumber)
        .then(function(result){
            if(result){
                var errors = [{
                    "type"  : "controller.student.CreateStudent",
                    "msg"   : "Identity number already exist",
                    "value" : req.body.identityNumber
                }]
                res.status(400).send({status:400, errors});
            } else {
                student.CreateStudent(req.body)
                .then(function (result) {
                    return res.status(200).send('Success!');
                })
            }
        })
    })  
    .catch(function(error){
        res.status(400).send(error); 
    })
}

module.exports.UpdateStudent = function (req, res) {

    studentValidator.ValidateRequest(req)
    .then(function(){
        student.GetStudentByStudentId(req.body.studentId)
        .then(function(result){
            if(!result){
                var errors = [{
                    "type"  : "controller.student.UpdateStudent",
                    "msg"   : "Not found (studentId: " + req.body.studentId + ")",
                    "value" : req.body.studentId
                }]
                res.status(400).send({status:400, message: error}); 
            } else {
                student.UpdateStudent(req.body)
                .then(function (result) {
                    res.status(200);
                    res.send(result);
                })
            }
        })
    })  
    .catch(function(error){
        // res.status(500).send({status:500, message: error}); 
        res.status(400).send({status:400, message: error}); 
    })

}

console.log('Loaded controller.student.js');