
const express =  require('express'); 
const app = express();
const {authRoutes,serviceRoutes,dashboardRoutes,contactRoutes}= require('./src/routes')
const connectDB = require('./src/config/db')
require('dotenv').config();
const errorHandlerMiddleware = require('./src/middleware/error-handler')
const notFoundMiddleware = require('./src/middleware/not-found')

const helmet = require('helmet');
const cors = require('cors');
//const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');




app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});



app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
//app.use(xss());

// app.use('/api/service',data)

app.use('/api/auth', authRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)




const port = process.env.PORT || 5000 

const start = async() =>{
  try {
    await  connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(` connnected ....app is listening on ${port} `))
  } catch (error) {
    console.log(error)
  }
}


start();