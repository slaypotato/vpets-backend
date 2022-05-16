import * as Joi from 'joi';

export const LOCAL_VAR_SCHEMA = Joi.object({
    PORT: Joi.number().default(8000),
    APP_NAME: Joi.string(),
    APP_VERSION: Joi.string(),
    APP_DESCRIPTION: Joi.string(),
    DB_URI:Joi.string(),
    DB_USER:Joi.string(),
    DB_PASS:Joi.string(),
    DB_NAME:Joi.string(),
  })