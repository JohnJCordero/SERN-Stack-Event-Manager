const dbConfig = require("../db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.events = require("../models/events.model")(sequelize, Sequelize);
db.users = require("../models/users.model")(sequelize,Sequelize);
db.users.hasMany(db.events,{foreignKey: 'userid'})
db.events.belongsTo(db.users,{foreignKey: "userid"})
db.events.belongsToMany(db.users,{ through:"attends"})
db.users.belongsToMany(db.events,{ through:"attends"})

module.exports = db;