const User = require('./users.model')
const Event = require("./events.model")
module.exports = (sequelize, Sequelize) => {


    const Attends = sequelize.define("attends", {

        userid: {
            type: Sequelize.INTEGER,
            references: {
                model:User,
                key: 'id'
            }
        },
        eventid: {
            type: Sequelize.INTEGER,
            references: {
                model:Event,
                key: 'id'
            }
        }
    });
    return Attends;
};