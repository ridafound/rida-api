
const { StatusCodes } = require('http-status-codes')
const { BadRequestError,NotFoundError } = require('../errors')
const Services = require('../models/service-model')

const createService = async (req, res) => {
  const { title, price } = req.body

  if (!title || !price) {
    throw new BadRequestError('Please provide title and price')
  }

  const service = await Services.create(req.body)

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Service created successfully',
    data: service,
  })
}

const getAllServices = async (req, res) => {
  
    const servicesList = await Services.find({})
    if(servicesList.length === 0){
      throw new NotFoundError('No Services found')
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: servicesList
    });
  
}

const deleteService = async (req, res) => {
  
    const { id } = req.params
    const deletedService = await Services.findByIdAndDelete(id);

    if (!deletedService) {
      throw new NotFoundError(`No Service with id:${id}`)
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Service deleted successefuly'
    });
  
}


const updateService = async (req, res) => {
 
    const { id } = req.params
    const updatedService = await Services.findByIdAndUpdate(
      id,
      req.body,                 // only fields sent will be updated
      {
        new: true,               // return updated document
        runValidators: true      // validate updated fields
      }
    )

    if (!updatedService) {
      throw new NotFoundError('service not found ')
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Service updated successefuly',
      data: updatedService
    })

  
}

const getService = async (req, res) => {
  try {
    const { id } = req.params
    const service = await Services.findById(id)
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'service not found '
      })
    }
    res.status(200).json({
      success: true,
      data: service
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}


module.exports = {
  createService,
  getAllServices,
  deleteService,
  getService,
  updateService
}