import Joi from "joi";


export const validateCreateUser = (user:any) => {
    const Schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required()
    });
    return Schema.validate(user);
};
export const validateLogin = (user:any) => {
    const Schema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    return Schema.validate(user);
};