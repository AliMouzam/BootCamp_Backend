const express = require('express');
const app = express();


const multer  = require('multer')
const upload = multer({ dest: 'images/' })

const user = require('./Controllers/UserController')
const responseService = require('./Services/responseService');
//const routes = require("../api/routes");
var router = require("express").Router();
var bodyParser = require('body-parser');  

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mongoose = require('mongoose');
const { userVerifyToken } = require('./Services/jwtService');

mongoose
  .connect('mongodb://127.0.0.1/TEST_DATABASE')
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("Database Connectivity Error", error);
    process.exit(1);
  });

app.use("/", router);

//
//let decode = userVerifyToken()

router.post('/getUser', userVerifyToken ,async (request,response) => {
  console.log("req", request.body)
  const res =  await user.getUser(request.body)
  console.log("RESPONSE", res)


 const data= responseService.responseMethod(res, 'create User')
  console.log("DATA", data)
  response.send(data)
});


router.post('/createUser',async (request,response) => {
  console.log("req", request.body)
 const res =  await user.createUser(request.body)
  console.log("RESPONSE", res)

 //const res =  await user.getUser()
 // user.updateUser(request.body)
 // user.deleteUser(request.body)

 const data= responseService.responseMethod(res, 'create User')
  console.log("DATA", data)
response.send(data)
});

router.post('/getImage', upload.single('image'), function (req, res, next) {
  console.log("req",req.file);
})

//app.use(app)
app.listen(8080, ()=>{
  console.log("Listening to port 8080")
})