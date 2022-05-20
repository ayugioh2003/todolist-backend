const mongoose = require('mongoose')
const validator = require('validator')

/**
 * User Model
 * 用戶管理模組
*/

const UserSchema = new mongoose.Schema({
  // 暱稱
  nickname: {
    type: String,
    required: [true, '暱稱為必填'],
    minlength: 2,
  },

  // Email
  email: {
    type: String,
    required: [true, 'Email 為必填'],
    unique: true,
    validate: [validator.isEmail, 'Email 格式錯誤'],
  },

  // 密碼
  password: {
    type: String,
    required: [true, '密碼為必填'],
    min: [6, '密碼至少 6 碼以上'],
    trim: true,
    select: false, // Never Show to user
  },

  // 建立時間，轉為 Timestamp 以方便前端好處理
  createdAt: {
    type: Number,
    select: false,
  },

  // 更新時間，轉為 Timestamp 以方便前端好處理
  updatedAt: {
    type: Number,
    select: false,
  },
},
  { versionKey: false, 
    timestamps: {
      currentTime: () => Date.now()
    } 
  }
)


const User = mongoose.model('User', UserSchema)

module.exports = User