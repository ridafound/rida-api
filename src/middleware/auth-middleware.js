const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = (req, res, next) => {
  const authHeaders = req.headers.authorization

  if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
     throw new UnauthenticatedError('Authentication invalid')
  }

  const token = authHeaders.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authorization invalid')
  }
}


module.exports = authenticationMiddleware


