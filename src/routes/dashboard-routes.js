const router = require('express').Router()
const { dashboardCount } = require('../controllers/dashboard-controller')

const authMiddleware = require('../middleware/auth-middleware')


router.get('/', authMiddleware, dashboardCount)

module.exports = router
