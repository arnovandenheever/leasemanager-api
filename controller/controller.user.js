var user = require('../repository/repository.user');

module.exports.GetUsers = function (req, res) {

    user.GetUsers()
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

module.exports.GetUserByUserId = function(req, res) {

    var userId = ''

    if(req.param.userId) {
        userId = req.param.userId;
    } else if(req.body.userId) {
        userId = req.body.userId;
    } else if(req.query.userId) {
        userId = req.query.userId;
    }    

    if(userId){
        user.GetUserByUserId(userId)
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

module.exports.GetUserByEmail = function(req, res) {

    var email = ''

    if(req.param.email) {
        email = req.param.email;
    } else if(req.body.email) {
        email = req.body.email;
    } else if(req.query.email) {
        email = req.query.email;
    }    

    if(email){
        user.GetUserByEmail(email)
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

module.exports.AuthenticateUser = function (req, res) {

    var authRes = {};

    user.GetUserByEmail(req.body.email)
    .then(function(result){
        if(result){
            user.ValidatePassword(req.body.password,result)
            .then(function (authRes) {
                if(authRes.result==='success'){
                    res.status(200);
                    res.json({ "token" : authRes.token });
                } else {
                    res.status(401).send({status:401, message: 'Login failed!', type:'Invalid password!'}); 
                }
            })
        } else {
            res.status(401).send({status:401, message: 'Login failed!', type:'Invalid username!'}); 
        }
    })
    .catch(function(error){
        if (error.message) {
            res.status(500).send({status:500, message: error.message}); 
        } else {
            res.status(500).send({status:500, message: error}); 
        }

    })


    // user.Authenticate(req.body.email, req.body.password)
    // .then(function (authRes) {
    //     if (authRes.result === 'success'){
    //         res.status(200);
    //         res.json({ "token" : authRes.token });
    //     } else {
    //         res.status(401)
    //         res.json({"message" : authRes.message});             
    //     }
        
    // })
    // .catch(function (error) {
    //     if (error.message) {
    //         res.status(500).send({status:500, message: error.message}); 
    //     } else {
    //         res.status(500).send({status:500, message: error}); 
    //     }
    // });
}

module.exports.RegisterUser = function (req, res) {

    user.GetUserByEmail(req.body.email)
    .then(function(result){
        if(!result){
            user.Register(req.body)
            .then(function (authRes) {
                res.status(200);
                res.json({ "token" : authRes.token });
            })
            .catch(function (err) {
                if (err.message) {
                    res.json({"err" : err.message});
                } else {
                    res.json({"err" : err});
                }
            });

        } else {
            res.status(400).send({status:400, message: 'Bad request', type:'Email already exist'}); 
        }
    })
    .catch(function(error){
        if (error.message) {
            res.status(500).send({status:500, message: error.message}); 
        } else {
            res.status(500).send({status:500, message: error}); 
        }

    })

}





// function updateUser(req, res) {
//     var userId = req.user.sub;
//     if (req.params._id !== userId) {
//         // can only update own account
//         return res.status(401).send('You can only update your own account');
//     }

//     userService.update(userId, req.body)
//         .then(function () {
//             res.sendStatus(200);
//         })
//         .catch(function (err) {
//             res.status(400).send(err);
//         });
// }

// function deleteUser(req, res) {
//     var userId = req.user.sub;
//     if (req.params._id !== userId) {
//         // can only delete own account
//         return res.status(401).send('You can only delete your own account');
//     }

//     userService.delete(userId)
//         .then(function () {
//             res.sendStatus(200);
//         })
//         .catch(function (err) {
//             res.status(400).send(err);
//         });
// }

console.log('Loaded controller.user.js');