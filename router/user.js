const express = require('express')

const router = express.Router()
// Controller
const userController = require('../controller/user.js')

// 登入
router.post('/sign_in', userController.signin)
// 登出
router.post('/sign_out', userController.signout)
// 註冊
router.post('/', userController.signup)

module.exports = router
