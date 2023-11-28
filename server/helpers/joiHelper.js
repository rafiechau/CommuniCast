const joi = require("joi");
const { handleResponse } = require("./handleResponseHelper");

//Function to return error status and hanlde response
exports.validateJoi = (res, data, schema, field = null) => {
  const { error } = handleValidateJoi(data, schema, field);
  if (error) {
    return {
      error: true,
      handleRes: handleResponse(res, 400, {
        status: "Validation Failed",
        message: error.details[0].message,
      }),
    };
  }
  return { error: false, handleRes: null };
};

//Function validate with joi and dynamic schema for PATCH
const handleValidateJoi = (data, schema, field) => {
  if (!field) {
    return joi.object(schema).validate(data);
  } else {
    const dynamicSchema = Object.keys(schema)
      .filter((key) => field.includes(key))
      .reduce((obj, key) => {
        obj[key] = schema[key];
        return obj;
      }, {});
    return joi.object(dynamicSchema).validate(data);
  }
};


//Schema post
exports.schemaPost = {
  title: joi.string().required(),
  shortDescription: joi.string().required(),
  des: joi.string().required(),
  image: joi.string().allow('').optional(),
};

//Schema User
exports.schemaUser = {
  fullName: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
};
