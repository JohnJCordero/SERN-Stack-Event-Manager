
module.exports = (sequelize, Sequelize) => {
    //const User = sequelize.import("./users.model")

    const Event = sequelize.define("events", {

        id: {
          type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        userid: {
          type: Sequelize.INTEGER,

        },

        description: {
            type: Sequelize.STRING
        },

        url: {
            type: Sequelize.STRING
        },

        // Use Sequelize.DATE if errors arrise. (DATEONLY does not include time)
        start: {
            type: Sequelize.DATEONLY
        },

        end: {
            type: Sequelize.DATEONLY
        },

        address: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        approved: {
            type: Sequelize.BOOLEAN
        }
    });
    return Event;
};