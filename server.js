
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const path = __dirname + '/public/';

const app = express();
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path));

var corsOptions = {
    origin: "http://localhost:3306"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();


require("./app/routes/events.routes")(app);
require('./app/routes/users.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});