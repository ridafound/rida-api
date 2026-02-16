const Services = require('../models/service-model')
const Contact = require('../models/contact-model');
const { StatusCodes } = require('http-status-codes')
const dashboardCount = async (req, res) => {

    const [totalMessages, pendingMessages, totalServices] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ responded: false }),
      Services.countDocuments()
    ])


    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        totalMessages,
        pendingMessages,
        totalServices,
        user:req.user.name
      }
    });

  
}

module.exports = {dashboardCount}