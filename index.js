const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv')
const createError = require('http-errors')
const UserRouter = require('./Routes/User.route');
const FishRouter = require('./Routes/Fish.route')
const escapeHTML = require('escape-html')
const rateLimit = require('express-rate-limit')
var compression = require('compression')
const bodyParser = require('body-parser'); 

//config server
dotenv.config();
require('./utils/connection')

const app = express();
const PORT = process.env.PORT

app.use(bodyParser.json());
app.use(compression())
app.use(cors())
app.use(express.json())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 50,
  message: 'Too many request, please try again later'
})

app.get('/', (req, res) => {
  res.send('HOME')
})

app.use(limiter)
app.use('/user', UserRouter)
app.use('/fish',FishRouter)

app.use((req, res, next) => {
  next(createError.NotFound('This route does not exist'))
})

app.use((error, req, res, next) => {
  res.json({
    status: error.status || 500,
    message: error.message
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
})
