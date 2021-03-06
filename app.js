
var multer = require("multer");
var express = require("express");
var app = express();

var route = express.Router();

// parser start
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true})) // By default encoding is UTF-8
app.use(bodyParser.json())
//end

route.get('/test',function(req,res){
    res.json({message:"Hello World"})
})

//test

route.post('/test', function(req,res){
    console.log('The body record is', req.body);
    res.json({message: "Record saved successfully"});
})

route.put('/test/:id', function(req,res){
    console.log("The id is " ,req.param.id);
    console.log("The body is", req.body);
    res.json({message:'Record updated.....'});
})

route.delete('/test/:id', function(req,res){
    console.log("The id is " ,req.param.id);
    console.log("The body is", req.body);
    res.json({message:'Record deleted.....'});
})

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/pics')
    },
    filename:function(req,file,cb)
    {
        console.log("File is ",file)
      //  console.log(file,req)
        cb(null,file.fieldname+'-'+Date.now())
    }
})

var upload = multer({storage:storage});

route.post('/test1', upload.single('pic'), function(req,res){
console.log('The body record is',req.body);
res.json({message:'File uploaded successfully'})
})

app.use('/api', route)

app.listen(3003, function(req,res){

    console.log("Server starts")
})