// Model
const User = require('../model/user.js')
// Utils
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const { successHandle } = require('../utils/resHandle.js')
const ApiState = require('../utils/apiState')

/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING))

  ApiState.js 可自行新增需要的錯誤內容
*/


/*
  登入功能	GET	/check
*/
const check = catchAsync(async (req, res, next) => {
  res.json({
    "message": "OK!"
  })

  // error
  // {
  //   "message": "未授權"
  // }
  
})



module.exports = {
  check
}