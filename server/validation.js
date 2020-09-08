const Joi = require('@hapi/joi');

//Validating the request of new user registration

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .min(5)
            .required()
            .email(),
        password: Joi.string()
            .min(5)
            .required()
    });
    return schema.validate(data);
};

//Validating the request of user login

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .min(5)
            .required()
            .email(),
        password: Joi.string()
            .min(5)
            .required()
    });
    return schema.validate(data);
};

//Exporting validation functions

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;