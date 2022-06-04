// Model
const User = require('../model/user.js')
// Utils
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const { successHandle } = require('../utils/resHandle.js')
const ApiState = require('../utils/apiState')
const { verifyToken } = require('../utils/verification')
/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING))

  ApiState.js 可自行新增需要的錯誤內容
*/

/*
  登入功能	GET	/check
*/
const isAuth = catchAsync(async (req, res, next) => {
  // 確認 token 是否存在
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    [, token] = req.headers.authorization.split(' ')
  }
  if (!token) {
    return next(
      new AppError({
        message: 'token不存在',
        status: ApiState.DATA_EXIST.status,
        statusCode: ApiState.DATA_EXIST.statusCode,
      })
    )
  }

  // 取的token驗證通過解密出來的使用者id
  const verify = await verifyToken(token)
  if (verify) {
    const result = await User.findOne({ _id: verify }, '_id name email')
    req.user = result
    return next()
  }

  return next(
    new AppError({
      message: '未授權',
      status: ApiState.FAIL.status,
      statusCode: ApiState.FAIL.statusCode,
    })
  )
})

module.exports = {
  isAuth,
}
