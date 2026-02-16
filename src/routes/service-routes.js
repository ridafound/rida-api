const router = require('express').Router()

const {
  createService,
  getAllServices,
  getService,
  updateService,
  deleteService
} = require('../controllers/services-controller')

router.route('/')
  .get(getAllServices)
  .post(createService)

router.route('/:id')
  .get(getService)
  .put(updateService)
  .delete(deleteService)

module.exports = router
