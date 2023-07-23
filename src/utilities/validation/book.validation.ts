import Joi from "joi";


export const validateCreateBook = (book:any) => {
    const Schema = Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        page_count: Joi.number().required()
    });
    return Schema.validate(book);
};