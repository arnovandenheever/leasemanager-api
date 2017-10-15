var list = require('../repository/repository.list');

module.exports.GetLists = function (req, res) {

    list.GetLists()
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

console.log('Loaded controller.list.js');