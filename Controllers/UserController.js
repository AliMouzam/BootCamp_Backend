
const User= require("../Models/User.model")
const bcrypt = require('bcrypt');

const {userSignToken} = require('../Services/jwtService')


const validateUser = require("../Schemas/user.schema.js");



class USER {
  getUser= async()=>{
    try {
      const res= await User.find({});
      return res;
    } catch (error) {
       throw new Error(error);
    } 
  }

  createUser = async (req) => {

    let user= req
    console.log(user)

    let token = userSignToken(user)
    console.log("TOKEN ======== >>>>>>>", await token)

    const {error} = validateUser(user)
 
    console.log("validate", error);

    // if(!user.firstName || !user.lastName || !user.phone || !user.email){
    //   return "Required data missing"
    // }

    if(error){
      return `Required data missing, ${error}`
    }

    let saltRounds=10;

    let myPlaintextPassword= user.password;

    let res = new Promise((resolve,reject )=>{

    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      console.log("SIMPLE PASSWORD", user.password)
      user.password= hash
      resolve(hash)
      console.log("HASH PASSWORD", hash, "AFTER", user.password)
      });
    })
  
    console.log("PROMISE",await res)
    user.password = await res;

    bcrypt.compare('fgfhftyfv$5654e', user.password, (err, result)=> {
      console.log("RESULT", result)
  });
  
   

    try {
      const res= await new User(user).save();
      return res;
    } catch (error) {
       throw new Error(error);
  }
  };
  
  updateUser =  (req) => {
    let data= req
    console.log(data)
    try {
      return User.findByIdAndUpdate(data._id, data.user, {
    new: true,
  })
    .then((user) => {
        console.log("USER SUCCESS", user)
      return user;
    })
    .catch((err) => {
      console.log("ERROR", err)
      return false;
    });



    } catch (error) {
       throw new Error(error);
  }
  };
  
  
  deleteUser =  (req) => {
    let data= req
    console.log(data)
    try {
      return User.remove({_id: data._id })
    .then((user) => {
      console.log("USER SUCCESS", user)
      return user;
    })
    .catch((err) => {
      console.log("ERROR", err)
      return false;
    });
    } catch (error) {
       throw new Error(error);
  }
  };

}

module.exports = new USER();
