module.exports = app => {
    const users = require("../controllers/users.controller.js");
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const router = require("express").Router();

    // Register a new account

    router.post("/", users.create);


    router.post('/login',users.login)

    // Delete a User with id
    router.delete("/:id", users.delete);

    router.get("/", users.findAll);

    app.use('/api/users', router);
};