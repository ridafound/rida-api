const router = require('express').Router()
const {
  createContacts,
  getAllMessages,
  replyedMessages
} = require('../controllers/contact-controller')

router.route('/')
  .post(createContacts)
  .get(getAllMessages)

router.patch('/:id', replyedMessages)

module.exports = router
