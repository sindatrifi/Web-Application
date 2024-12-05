const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateOffre(data) {
  let errors = {};
  data.type = !isEmpty(data.type) ? data.type : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.Description = !isEmpty(data.Description) ? data.Description : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.niveau_etude=!isEmpty(data.niveau_etude) ? data.niveau_etude : "";
  data.salaire=!isEmpty(data.salaire) ? data.salaire: "";
  data.langues=!isEmpty(data.langues) ? data.langues: "";
  data.lieu =!isEmpty(data.lieu) ? data.lieu: "";
  data.mot_cles =!isEmpty(data.mot_cles) ? data.mot_cles: "";
  data.date_dexpiration =!isEmpty(data.date_dexpiration) ? data.date_dexpiration: "";

  
  if (validator.isEmpty(data.type)) {
    errors.type = "Required type";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Required name";
  }
  if (validator.isEmpty(data.Description)) {
    errors.Description = "Required Description";
  }
  if (validator.isEmpty(data.date)) {
    errors.date = "Required date";
  }
  if (validator.isEmpty(data.niveau_etude)) {
    errors.niveau_etude = "Required niveau_etude";
  }
  if (validator.isEmpty(data.salaire)) {
    errors.salaire = "Required salaire";
  }
    if (validator.isEmpty(data.langues)) {
      errors.langues = "Required langues";
    
  }
  if (validator.isEmpty(data.lieu)) {
    errors.lieu = "Required lieu";
  
}

if (validator.isEmpty(data.mot_cles)) {
    errors.mot_cles = "Required mot_cles";
  
}

if (validator.isEmpty(data.date_dexpiration)) {
    errors.date_dexpiration = "Required date_dexpiration";
  
}



 
  return {
      errors,
      isValid: isEmpty(errors)
  }
};
