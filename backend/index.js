const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.port||8800;
const mongoose = require("mongoose");
const {mongoUrl}=require("./keys")
//to eliminate cors policy which occurs beacuse of different domain of fronted and backend
const cors=require("cors");
console.log(process.env.ACCESS_CONTROL_ORIGIN)
app.use(
	cors()
);
const path =require("path")

require('./models/model')
require('./models/post')
app.use(express.json());
app.use(require("./routes/auth"))
app.use(require('./routes/createPost'))
app.use(require('./routes/user'));
// let mongoUrl = process.env.MONGOURL
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
mongoose.connect(mongoUrl);

app.listen(port, () => {
  console.log("server is running " + port);
});

//to check database is connected or not
mongoose.connection.on("connected",()=>{
    console.log("successfully sonnected to mongo")
})
//checking error if database is not connected
mongoose.connection.on("error",()=>{
    console.log("Not connected")
})
