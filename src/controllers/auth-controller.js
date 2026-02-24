const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')


const register = async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    throw new BadRequestError('please provide name,email and password')
  }

  const user = await User.create(req.body)
  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({
    success: true,
    user: { name: user.name },
    token,
  })



}


const login = async (req, res) => {

  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('please provide email and password')
  }

  const user = await User
    .findOne({ email })
    .select('+password')

  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const ispasswordCorrect = await user.comparePassword(password)

  if (!ispasswordCorrect) {
    throw new UnauthenticatedError('invalid credentials ')
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Login successfully',
    token
  })



}

getAllUsers = async (req, res) => {
  const users = await User.find({})
  if (!users.length === 0) {
    throw new NotFoundError('No user Found')
  }
  res.status(StatusCodes.OK).json({ users })
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new NotFoundError(`No user with id:${id}`)
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'user deleted successefully'
  })
}

module.exports = { register, login, getAllUsers,deleteUser }