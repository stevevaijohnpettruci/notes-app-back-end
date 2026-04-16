import Joi from 'joi';

export const notePayloadSchema = Joi.object({
  title: Joi.string().required().max(50),
  tags: Joi.array().items(Joi.string()).required(),
  body: Joi.string().required(),
});
