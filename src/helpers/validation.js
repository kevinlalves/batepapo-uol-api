export default function validate(object, schema, res) {
  const validation = schema.validate(object, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map(detail => detail.message);

    res.status(422).send(errors);
    return false;
  }

  return true;
}
