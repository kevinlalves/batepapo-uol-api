import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required(),
});

export default function validateParticipant(participant) {
  return Joi.validate(participant, schema);
}
