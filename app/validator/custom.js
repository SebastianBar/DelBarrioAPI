import validator from 'validator'

// Validaciones oficiales en https://github.com/chriso/validator.js
// Se montan validaciones customizadas
validator.isRequired = val => {
  return val != null
}

export default validator
