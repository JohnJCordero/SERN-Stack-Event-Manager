
const db = require("../models/index");
const Event = db.events;
const Op = db.Sequelize.OP;
const User = db.users;
const attends = db.attendedEvents;
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
        city: req.body.city,
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
exports.attendEvent = (data) => {
    return Event.findByPk(data.body.eventId)
        .then ((event) => {

        if(!event)
        {
            console.log("Event not found")
            return null;
        }

        return User.findByPk(data.body.userId).then((user) => {
            if(!user)
            {
                console.log("User not found")
            }
            event.addUser(user)
            console.log(`Added User id=${user.id} to Event id=${event.id}`)
            return event
        });
    })
        .catch((err) => {
            console.log("Error while adding User to Event:" , err)
        })
}
exports.isAttending = (data) => {
    return Event.findAll()
        .then ((user) => {

            if(!user)
            {
                console.log("User not found")
            }

            console.log(`Found User id=${user.id} attended events list`)
            return user

        })
        .catch((err) => {
            console.log("Error while finding User attended Event list:" , err)
        })
}
exports.listAttendedEvents = (req,res) => {
    const id = req.body.id;
    User.findAll({

                include: [{
                    model: Event,
                    required: true,
                    as:"attendedEvents"

                }],

        where:{id: id}
    }).then(user =>{
        if(!user)
            return res.status(400).send({
                message:"Incorrect Username"
            })

            return res.status(200).send(
                {user}
            )


            return res.status(400).send({
                message: "Incorrect Password"
            })

    }).catch(err => {
        res.status(400).send({
            message: err.message
        })
    })

}


exports.unattendEvent = (data) => {
    return Event.findByPk(data.body.eventId)
        .then ((event) => {
            if(!event)
            {
                console.log("Event not found")
                return null;
            }

            return User.findByPk(data.body.userId).then((user) => {
                if(!user)
                {
                    console.log("User not found")
                }

                event.removeUser(user)
                console.log(`Removed User id=${user.id} to Event id=${event.id}`)
                return event
            });
        })
        .catch((err) => {
            console.log("Error while deleting User to Event:" , err)
        })
}

// Retrieve all
exports.findAll = (req, res) => {
    const userid = req.query.userid;
    const condition = userid ? {userid: {[Op.like]: `%${userid}%`}} : null;
    Event.findAll({ include: [{
        model: User
        }] })
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