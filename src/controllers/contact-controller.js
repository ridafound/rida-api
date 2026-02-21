const Contact = require('../models/contact-model');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError}= require('../errors/index')

const createContacts = async (req, res) => {
  
    const { name, email, message } = req.body;

  if (!name || !email || !message) {
    throw new BadRequestError('Name, email and message are required');
  }

  const contact = 
  await Contact.create({
    name,
    email,
    message,
  });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Messages sent successefully'
    })

}


const getAllMessages = async (req, res) => {
  
    const { responded } = req.query
    const queryObject = {}

    if (responded !== undefined) {
      queryObject.responded = responded === "true";
    }


    const messages = await Contact.find(queryObject).sort({ createdAt: -1 })

    if (!messages.length) {
    throw new NotFoundError('No messages found')
  }

    res.status(StatusCodes.OK).json({
      success: true,
      data: messages,
      message: 'Messages loaded successefully'
    })
  
}

const replyedMessages = async (req, res) => {
  
    const { id } = req.params
    const message = await Contact.findByIdAndUpdate(
      id,
      req.body,                 // only fields sent will be updated
      {
        new: true,               // return updated document
        runValidators: true      // validate updated fields
      }
    )

    if (!message) {
      throw new NotFoundError('Message not found')
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'message sent successefuly',
      data: message
    })


}

module.exports = {
  createContacts,
  replyedMessages,
  getAllMessages,
}