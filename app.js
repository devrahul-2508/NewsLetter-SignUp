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
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data ={
        members :[
            {
                email_address : email,
                status :  "subscribed",
                merge_fields :{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData =JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/a2a44b70a5";
    
    const options={
        method : "POST",
        auth: "rahul:5c4eed276367a46d4986761c7cc18136-us17"
    }
    
    const request=https.request(url,options,function(response){

        if(response.statusCode == 200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }

            response.on("data",function(data){
                    console.log(JSON.parse(data));
            })
    })
    request.write(jsonData);
    request.end();
});


app.listen(process.env.PORT || 3000,function(){
    console.log("Server started at port 3000");
})


