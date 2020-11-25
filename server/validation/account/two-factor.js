const Validator = require('validator');
const isEmpty = require('../../utils/is-empty');

module.exports = data => {
  const errors = {};

  data.code = !isEmpty(data.code) ? data.code : '';

  if (Validator.isEmpty(data.code)) {
    errors.code = 'Code is required.';
  }

  if (!Validator.isLength(data.code, { min: 6, max: 6 })) {
    errors.code = 'Code must 6 characters long';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
