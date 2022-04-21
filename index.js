const express =require("express");
const app=express();


app.get('/',(req,res)=>{
    res.send('hello');
})
// In case of dev environment, we would still use 5000 
const HEROKU_PORT=process.env.PORT || 5000;

app.listen(HEROKU_PORT);