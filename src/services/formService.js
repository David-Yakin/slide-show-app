const useForm = () => {
  let data = {};
  let errors = {};

  /********** validate term **********/
  const validateTerm = (field, validation) => {
    let errors = [];
    const {
      regex = null,
      min = 0,
      max = 1_000_000_000,
      upperCase = null,
      lowerCase = null,
    } = validation;
    const input = field.value;

    if (input.length < +min)
      errors.push(`This field must be at least ${min} characters long`);
    if (input.length > +max)
      errors.push(`This field cannot contain more than ${max} characters`);
    if (upperCase) {
      if (input.match(/[A-Z]/g) === null)
        errors.push(`This field must have at least one uppercase letter`);
    }
    if (lowerCase) {
      if (input.match(/[a-z]/g) === null)
        errors.push(`This field must have at least one lowercase letter`);
    }
    if (regex) {
      if (input.match(regex) === null)
        errors.push(
          `The field must contain the following regulatory expression: ${regex}`
        );
    }
    if (input.match(/[^A-Za-z0-9א-ת\s!@#$%^*&_/:.-]/g))
      errors.push("You used a forbidden sign!");

    errors = errors.length ? errors : null;
    return errors;
  };

  /********** input validation **********/
  const onValidateField = (input, errorSpan, validation = {}) => {
    data[input.name] = input.value;
    errorSpan.innerHTML = "";
    const errorsFromField = validateTerm(input, validation);
    if (errorsFromField) {
      errorsFromField.map(error => (errorSpan.innerHTML += error + "<br>"));
      errors[input.name] = errorsFromField;
      return;
    }
    delete errors[input.name];
  };

  const onChangeInputField = (schema, element, btn) => {
    const { input, errorSpan, validation } = element;
    onValidateField(input, errorSpan, validation);
    onCheckErrors(schema, btn);
  };

  /********** handle button disabled **********/
  const onCheckErrors = (schema, btn) => {
    const isArrayEmpty = schema.filter(key => !data[key]);
    if (isArrayEmpty.length) return btn.setAttribute("disabled", "disabled");
    const keys = Object.keys(errors);
    if (keys.length) return btn.setAttribute("disabled", "disabled");
    btn.removeAttribute("disabled");
    return;
  };

  /********** clear all form fields and errors **********/
  const onClearFormFields = (btn, fields, errorSpans) => {
    fields.map(field => (field.value = ""));
    errorSpans.map(error => (error.innerHTML = ""));
    btn.setAttribute("disabled", "disabled");
    data = {};
    errors = {};
  };

  return {
    onCheckErrors,
    onChangeInputField,
    onClearFormFields,
  };
};

export default useForm;
