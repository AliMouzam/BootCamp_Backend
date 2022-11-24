const Joi = require("joi");

const validateUser = (user) => {
    console.log("user",user)

  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(3).required(),
    lastName: Joi.string().alphanum().min(3).required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: ["com", "net","app" , "org" , "int"] } })  
  });

  console.log("VALIDATE", schema.validate(user) )
  return schema.validate(user);
};
module.exports = validateUser
