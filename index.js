const express =require("express");
const app=express();

const HEROKU_PORT=process.env.PORT;

app.listen(HEROKU_PORT);