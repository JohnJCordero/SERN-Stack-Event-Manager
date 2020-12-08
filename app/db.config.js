module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "123456",
    DB: "eventmanager",
    dialect: "mysql",
    port:"8080",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};