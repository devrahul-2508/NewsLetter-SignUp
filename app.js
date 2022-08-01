const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(__dirname+"/public"));


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    var fName = req.body.fname;
    var lName = req.body.lname;
    var email = req.body.email;

    console.log("FirstName"+fName+"LastName"+lName+"email"+email);
})


app.listen(3000,function(){
    console.log("Server started at port 3000");
})
