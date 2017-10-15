var room = require('../repository/repository.room');

module.exports.GetRooms = function (req, res) {

    room.GetRooms()
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

console.log('Loaded controller.room.js');