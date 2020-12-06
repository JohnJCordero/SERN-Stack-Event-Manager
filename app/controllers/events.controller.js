const db = require("../models/index");
const Event = db.events;
const Op = db.Sequelize.OP;

// Create and Save a new event
exports.create = (req, res) => {
console.log(req)
  if (!req.body.name) {
    res.status(400).send({ message: "Event cannot be empty!" });
     return;
   }

    const events = {  // Using "Event" caused reserved word issue.
        name: req.body.name,
        userid: req.body.userid,
        description: req.body.description,
        url: req.body.url,
        start: req.body.start,
        end: req.body.end,
        address: req.body.address,
        approved: req.body.approved
    };

    Event.create(events)
        .then(data => {
            res.send(data);
            console.log(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred when creating an Event"
            });
        });
};

// Retrieve all
exports.findAll = (req, res) => {
    const userid = req.query.userid;
    const condition = userid ? {userid: {[Op.like]: `%${userid}%`}} : null;

    Event.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Events."
            });
        });
};

// Find by ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    Event.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while looking up by ID"
            });
        });
};

// Update by ID
exports.update = (req, res) => {
    const id = req.params.id;

    Event.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Event was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Event with id=" + id
            });
        });
};

// Delete by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Event.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Event was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Event with id=" + id
            });
        });
};

exports.findAllApproved = (req, res) => {
    Event.findAll({ where: { approved: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving approved Events."
            });
        });
};