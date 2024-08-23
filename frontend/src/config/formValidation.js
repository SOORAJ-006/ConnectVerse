import Joi from "joi";

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
            'string.email': 'Invalid email address.',
            'any.required': 'Email is required.',
        }),
    password: Joi.string()
        .min(4)
        .max(8)
        .required()
        .messages({
            'string.min': 'Password should have a minimum length of 4 characters.',
            'string.max': 'Password should have a maximum length of 8 characters.',
            'any.required': 'Password is required.',
        }),
});

const signupSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.alphanum': 'Username must only contain alphanumeric characters.',
            'string.min': 'Username should have a minimum length of 3 characters.',
            'string.max': 'Username should have a maximum length of 30 characters.',
            'any.required': 'Username is required.',
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
            'string.email': 'Invalid email address.',
            'any.required': 'Email is required.',
        }),
    password: Joi.string()
        .min(4)
        .max(8)
        .required()
        .messages({
            'string.min': 'Password should have a minimum length of 4 characters.',
            'string.max': 'Password should have a maximum length of 8 characters.',
            'any.required': 'Password is required.',
        }),
});

export { loginSchema, signupSchema };
