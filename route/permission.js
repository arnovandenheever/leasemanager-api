(function(module) {
    module.exports = {
        permit: function (...allowed) {

            return function(req, res, next){
                if (req.user && allowed.indexOf(req.user.usertype.toLowerCase()) > -1) {  
                    next();                       
                } else {
                    res.status(403).send({ status: 403, message: 'Forbidden', type: 'User permission' });
                }
            }
        }
    }
})(module);