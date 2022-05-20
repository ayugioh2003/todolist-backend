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
// jwt
const jwt = require('jsonwebtoken');

/*
  res 回傳錯誤範例
  return next(new AppError(ApiState.FIELD_MISSING))

  ApiState.js 可自行新增需要的錯誤內容
*/

/*
  登入功能	POST	/sign_in
*/
const signin = catchAsync(async (req, res, next) => {
  console.log(req.body);
  let memberData = {
    email: req.body.user.email,
    password: req.body.user.password,
  };

  // 驗證
  const errors = [];
  if (!memberData.email || !memberData.password) {
    errors.push('信箱、密碼為必填項目');
  }
  if (checkEmail(req.body.user.email) === false) {
    errors.push('電子信箱 格式有誤');
  }
  if (!checkPassword(req.body.user.password)) {
    errors.push('密碼 字數太少，至少需要 6 個字');
  }
  // 驗證通過再加密密碼
  memberData.password = hashPassword(req.body.user.password);

  const findRes = await User.findOne({
    email: memberData.email,
    password: memberData.password,
  });

  // find 沒找到東西的 res 是 null
  if (findRes === null) {
    errors.push('登入失敗，信箱或密碼錯誤');
  }
  
  if (errors.length > 0) {
    return next(
      new AppError({
        message: '登入發生錯誤',
        errors,
        statusCode: ApiState.FIELD_MISSING.statusCode,
      })
    );
  }
  const token = jwt.sign(
    // data的內容可以在登入解密出來
    {
      id: findRes._id,
    },
    // 給jwt一個字串當作加密編碼參考 需要隱藏起來 否則會有被反推的機會
    // 驗證的時候要用一樣的字串去解 不然會算不出原本的資料
    process.env.SECRET,
    {
      algorithm: 'HS256', // 加密方式
      // 多久之後到期 60一分鐘到期 60*60一小時
      // 也可以不用exp直接在secret後面加上{ expiresIn: '1h' }
      // exp: Math.floor(Date.now() / 1000) + 60 * 60,
      expiresIn: process.env.EXPIRES_IN,
    }
  );
  res.setHeader('token', token);

  return successHandle({ res, statusCode: 200, message: '登入成功', data:findRes });
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
  const errors = [];
  if (!memberData.nickname || !memberData.email || !memberData.password) {
    errors.push('名稱、信箱、密碼為必填項目');
  }
  if (!checkEmail(req.body.user.email)) {
    errors.push('電子信箱 格式有誤');
  }
  if (!checkPassword(req.body.user.password)) {
    errors.push('密碼 字數太少，至少需要 6 個字');
  }
  if (checkEmail(req.body.user.email)) {
    const userRes = await User.findOne({ email: memberData.email }).exec();
    console.log('userRes1', userRes);
    if (userRes) {
      errors.push('電子信箱 已被使用');
    }
  }

  if (errors.length > 0) {
    return next(
      new AppError({
        message: '註冊發生錯誤',
        errors,
        statusCode: ApiState.FIELD_MISSING.statusCode,
      })
    );
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
