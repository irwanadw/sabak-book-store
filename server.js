require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = (process.env.PORT)
const indexRoute = require("./routes/index");

app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}))
app.use(indexRoute);

mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("Database Connected");
}).catch((err)=>{
    console.log("Database fail to connect :", err);
});

app.listen(port || 3000, () => {
    console.log(`server is listening http://localhost:${port}`);
  });