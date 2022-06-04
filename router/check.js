const express = require('express')

const router = express.Router()
// Controller
const checkController = require('../controller/check.js')
// 登入權限測試
router.get('/', checkController.check)

module.exports = router
