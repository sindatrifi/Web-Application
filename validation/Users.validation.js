const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateUser(data) {
  let errors = {};
  data.Email = !isEmpty(data.Email) ? data.Email : "";
  data.Lastname = !isEmpty(data.Lastname) ? data.Lastname : "";
  data.Firstname = !isEmpty(data.Firstname) ? data.Firstname : "";
  
  data.Adress=!isEmpty(data.Adress) ? data.Adress : "";
  data.Phone=!isEmpty(data.Phone) ? data.Phone: "";
 
  if (!validator.isEmail(data.Email)) {
    errors.Email = "Format Email required";
  }
  if (validator.isEmpty(data.Email)) {
    errors.Email = "Required Email";
  }
  if (validator.isEmpty(data.Lastname)) {
    errors.Lastname = "Required Lastname";
  }
  if (validator.isEmpty(data.Firstname)) {
    errors.Firstname = "Required Firstname";
  }
  
  if (validator.isEmpty(data.Phone)) {
    errors.Phone = "Required phone";
  }
  if (validator.isEmpty(data.Adress)) {
    errors.Adress = "Required Adress";
  }
   

 
  return {
      errors,
      isValid: isEmpty(errors)
  }
};
