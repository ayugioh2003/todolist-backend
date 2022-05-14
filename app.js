/* eslint-disable import/order */
const express = require('express')

const app = express()
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

// Utils
const corsOptions = require('./utils/cors.js')
// Router
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const checkRouter = require('./router/check.js')
const userRouter = require('./router/user.js')
const todoRouter = require('./router/todo.js')

// Controller
const globalErrorHandler = require('./controller/globalError.js')
const AppError = require('./utils/appError.js')
const ApiState = require('./utils/apiState.js')
const apiState = require('./utils/apiState.js')

// Swagger
const swaggerPath = path.resolve(__dirname, './swagger.yml')
const swaggerDocument = YAML.load(swaggerPath)
// const cssOptions = require('./utils/swagger.js')

// API Document
app.use('/apidoc', swaggerUi.serve)
apiState.get('/apidocs', swaggerUi.setup(swaggerDocument))

app.use(morgan('dev'))
app.use(express.json())
app.use(cors(corsOptions))

// Router
app.use('/check', checkRouter)
app.use('/users', userRouter)
app.use('/todos', todoRouter)

// 無此路由
app.use('*', (req, res, next) => {
  next(new AppError(ApiState.ROUTER_NOT_FOUND))
})

// 全域處理錯誤
app.use(globalErrorHandler)

module.exports = app
