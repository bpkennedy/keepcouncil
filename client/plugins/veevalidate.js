import { extend } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, email, alpha_spaces } from 'vee-validate/dist/rules'

extend('url', {
  validate: (value) => {
    return value && typeof value === 'string' && value.trim().length > 0
  },
  message: 'Must be a url address',
})

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('email', {
  ...email,
  message: 'Invalid email address',
})

extend('alpha_spaces', {
  // eslint-disable-next-line camelcase
  ...alpha_spaces,
  message: 'Must be only alphabetical characters with optional spaces',
})

extend('digits', {
  params: ['limit'],
  validate: (value, { limit }) => {
    const stringLimit = parseInt(limit, 10)
    if (value && value.length === stringLimit) {
      const number = parseInt(value, 10)
      if (number && number.toString().length === stringLimit) {
        return true
      }
    }
    return false
  },
  message: 'Must be exactly {limit} numbers with no dashes or spaces',
})
