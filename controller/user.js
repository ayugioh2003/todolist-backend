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
  登入功能	POST	/sign_in
*/
const signin = catchAsync(async (req, res, next) => {
  res.json({
    "message": "登入成功",
    "email": "test@gmail.com",
    "nickname": "test"
  }
  )

  // error
  // {
  //   "message": "登入失敗"
  // }  
})

/*
  登出功能	GET	/sign_out
*/
const signout = catchAsync(async (req, res, next) => {
  res.json({
    "message": "已登出"
  }
  )
  // error
  // {
  //   "message": "登出失敗"
  // }
  
})

/*
  註冊功能	POST	/
*/
const signup = catchAsync(async (req, res, next) => {
  res.json({
    "message": "註冊成功",
    "email": "a@gmail.com",
    "nickname": "a"
  }
  )

  // error
  // {
  //   "message": "註冊發生錯誤",
  //   "error": [
  //     "電子信箱 格式有誤"
  //   ]
  // }
  
})



module.exports = {
  signin,
  signout,
  signup,
}