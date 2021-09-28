const express = require('express');
const cors = require('cors');
const app = express();
const user = require("./routes/userRoutes");
const InitiateMongoServer = require("./config/db");

require('dotenv').config()

InitiateMongoServer();

const PORT = process.env.PORT;

app.use(express.json())

app.use(cors());

app.use("/api/v1/users", user);

app.listen(PORT,() => {
    console.log(`App listening at http://localhost:${PORT}`.underline)
})