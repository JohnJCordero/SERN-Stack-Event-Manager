
module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
        name: {
            type: Sequelize.STRING
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
        approved: {
            type: Sequelize.BOOLEAN
        }
    });

    return Event;
};