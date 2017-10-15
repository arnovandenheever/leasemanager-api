var house = require('../repository/repository.house');

module.exports.GetHouses = function (req, res) {

    // repository = new Repository;
    house.GetHouses()
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

console.log('Loaded controller.house.js');