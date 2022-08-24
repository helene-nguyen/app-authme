//~ Import modules
import joi from 'joi';
const Joi = joi;

//~ Article schema
const articleSchema = Joi.object({
  title: Joi.string().required(),
  abstract: Joi.string().required(),
  content: Joi.string().required(),
  user_id: Joi.number().integer().required(),
  status_id: Joi.number().integer().required(),
  categories: Joi.array()
})
  .min(1)
  .max(6);

export { articleSchema };
