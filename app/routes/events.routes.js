module.exports = app => {
    const events = require("../controllers/events.controller.js");

    const router = require("express").Router();

    // Create a new Event
    router.post("/", events.create);

    router.post("/attend",events.attendEvent)

    router.post("/unattend",events.unattendEvent)
    // Retrieve all Events
    router.get("/", events.findAll);

    // Retrieve all approved Events
    router.get("/published", events.findAllApproved);

    // Retrieve a single Event with id
    router.get("/:id", events.findOne);

    // Update a Event with id
    router.put("/:id", events.update);

    // Delete a Event with id
    router.delete("/:id", events.delete);



    app.use('/api/events', router);
};