const BadRequestError = require('./bad-request')
const CustomAPIError = require('./custom-api')
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-Found')

module.exports = {
  BadRequestError,
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError
}