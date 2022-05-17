// Model
const User = require('../model/user.js');
// Utils
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { successHandle } = require('../utils/resHandle.js');
const ApiState = require('../utils/apiState');
// Utils 加密模組
const { hashPassword } = require('../utils/hash');
const { checkEmail, checkPassword } = require('../utils/verification');

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
    message: '登入成功',
    email: 'test@gmail.com',
    nickname: 'test',
  });

  // error
  // {
  //   "message": "登入失敗"
  // }
});

/*
  登出功能	GET	/sign_out
*/
const signout = catchAsync(async (req, res, next) => {
  res.json({
    message: '已登出',
  });
  // error
  // {
  //   "message": "登出失敗"
  // }
});

/*
  註冊功能	POST	/
*/
const signup = catchAsync(async (req, res, next) => {
  console.log(req.body);
  let memberData = {
    nickname: req.body.user.nickname,
    email: req.body.user.email,
    password: req.body.user.password,
  };

  // 驗證
  const errors = []
  if (!memberData.nickname || !memberData.email || !memberData.password) {
    errors.push('名稱、信箱、密碼為必填項目')
  }
  if (!checkEmail(req.body.user.email)) {
    errors.push('電子信箱 格式有誤')
  }
  if (!checkPassword(req.body.user.password)) {
    errors.push('密碼 字數太少，至少需要 6 個字')
  }
  if (checkEmail(req.body.user.email)) {
    const userRes = await User.findOne({ email: memberData.email }).exec()
    console.log('userRes1', userRes)
    if (userRes) {
      errors.push('電子信箱 已被使用')
    }
  }

  if (errors.length > 0) {
    return next(
      new AppError({
        message: '註冊發生錯誤',
        errors,
        statusCode: ApiState.FIELD_MISSING.statusCode,
      })
    )
  }
  
  // 資料驗證全部通過再加密密碼
  memberData.password = hashPassword(req.body.user.password);
  const createRes = await User.create(memberData);
  console.log('createRes', createRes);
  const data = {
    _id: createRes._id,
    nickname: createRes.nickname,
    email: createRes.email,
  };

  return successHandle({ res, statusCode: 201, message: '註冊成功', ...data });
});

module.exports = {
  signin,
  signout,
  signup,
};
