const express = require("express");
const bodyParser= require("body-parser");
const request=require("request");
const https=require("https"); 

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res)
{
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res)
{
    const fname = req.body.firstname;
    const lname=req.body.lastname;
    const email=req.body.emailadd;
    console.log(fname,lname,email);
    
    var data={
        members: [{
            email_address: email ,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname,

            }

        }]
    };
    app.post("/failure" , function(req,res){
        res.redirect("/");
    })

    var jsonData=JSON.stringify(data);
    
    const url= "https://us21.api.mailchimp.com/3.0/lists/c01cf61293";
    
    const options={
        method:"POST",
        auth: "Pranav:5265b263eca4314b1b6aa54b65a3f4bb-us21"


    }

    const request=https.request(url, options , function(response)
    {
        if (response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data" , function(data)
        {
            console.log(JSON.parse(data)); 
        })
    })
    request.write(jsonData); 
    request.end();

});


app.listen(process.env.PORT || 3000, function()
{
    console.log("server is running on port 3000");
})

// api key-5265b263eca4314b1b6aa54b65a3f4bb-us21

// audiance-id c01cf61293
 