const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().required().max(30),
        last_name: Joi.string().required().max(30),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5),
        phoneNumber: Joi.number().min(11)
    })
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5)
    })
    return schema.validate(data);
}

const jobValidation = (data) => {
    const schema = Joi.object({
        job_title: Joi.string().required().min(5),
        job_description: Joi.string().required().min(10),
        job_category: Joi.string().required(),
        company_name: Joi.string().min(5).required(),
        company_email: Joi.string().required().email(),
        website_url: Joi.string(),
        application_link: Joi.string().min(5)
    }).unknown()
    return schema.validate(data);
}

const jobUpdateValidation = (data) => {
    const schema = Joi.object({
        job_title: Joi.string().min(5),
        job_description: Joi.string().min(10),
        job_category: Joi.string().min(3),
        company_name: Joi.string().min(5),
        company_email: Joi.string().email(),
        website_url: Joi.string().min(5),
        application_link: Joi.string().min(5)
    })
    return schema.validate(data);
}
    
   

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.jobValidation = jobValidation;
module.exports.jobUpdateValidation = jobUpdateValidation;



