const jwt = require("jsonwebtoken");
const constants = require("../Utilities/appConstants");
//const messageConstants = require("../utilities/appMessages");

var userSubject;
var decodedUser;

module.exports = {
  // USER TOKEN AND VERIFICATION

  userSignToken(user) {

    console.log("IT IS WORKING", user)

    userSubject = user.email;

    var i = "bootcamp_backend"; // Issuer
    var s = userSubject; // Subject
    var a = "user"; // Audience
    // SIGNING OPTIONS
    var signOptions = {
      issuer: i,
      subject: s,
      audience: a,
      algorithm: "RS256",
    };

    return new Promise(function (resolve, reject) {
      var token = jwt.sign(
        { user },
        constants.PRIVATE_KEY,
        signOptions,

        (err, token) => {
          if (err) {
            reject(err)
            console.log("ERROR", err)
          } else {
            resolve(token)
            console.log("TOKEN", token)
          }
        }
      );
    });
  },

  userVerifyToken(req, res, next) {
    console.log("REQ", req.headers)
    const bearerHeader = req.headers.authentication;

    // Check if bearer is undefined
    try {
      if (typeof bearerHeader !== "undefined") {
          console.log("IF CONDITION",bearerHeader)
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];

        console.log(bearer, token)

        const decode_token = jwt.decode(token, { complete: true });

        console.log("DECODE", decode_token)
        var i = "bootcamp_backend"; // Issuer
        var s = decode_token.payload.user.email; // Subject
        var a = "user"; // Audience


        var verifyOptions = {
          issuer: i,
          subject: s,
          audience: a,
          algorithm: ["RS256"],
        };
        jwt.verify(
          token,
          constants.PUBLIC_KEY,
          verifyOptions,
          function (err, decoded) {
            if (err) {
              console.log("ERROR", err)
            } else { 
              decodedUser = decoded.user
              console.log("DECODE", decodedUser)
            }
          }
        );

        return next();
      } else {
      
      }
    } catch (error) {
        console.log('ERROR', error)
    }
  },

  getDecodedUser(){
    return decodedUser;
  }
};
