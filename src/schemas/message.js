import Joi from "joi";

const schema = Joi.object({
  from: Joi.string().required(),
  to: Joi.string().required(),
  text: Joi.string().required(),
  type: Joi.string().valid("message", "private_message").required()
});

export const paramsSchema = Joi.object({
  user: Joi.string().required(),
  limit: Joi.number().min(1)
});

export default schema;
