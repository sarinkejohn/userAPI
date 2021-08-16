require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const patientRouter = require("./api/patient/patient.router");
const userRouter = require("./api/users/user.router");

app.use(express.json()); 
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/patient", patientRouter);
app.use("/api/users",userRouter)

app.listen(process.env.APP_PORT,()=>{

    console.log("SERVER UP & RUNNING on PORT",process.env.APP_PORT);
});