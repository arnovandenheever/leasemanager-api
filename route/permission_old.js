// middleware for doing role-based permissions

module.exports.permit = function (...allowed) {
// const isAllowed = role => allowed.indexOf(role) > -1;

    var isAllowed = function (role) {
        return allowed.indexOf(role.toLowerCase()) > -1
    }

    // return a middleware
    return (req, res, next) => {
        if (req.user && isAllowed(req.user.usertype)) {
            // console.log(isAllowed(req.user.usertype))
            next(); // role is allowed, so continue on the next middleware                        
        } else {
            // response.status(403).json({message: "Forbidden"}); // user is forbidden
            res.status(403).send({ status: 403, message: 'Forbidden', type: 'User permission' });
        }
    }
}