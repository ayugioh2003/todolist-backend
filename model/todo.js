const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema(
  {
    // 發文者名稱
    user_id: {
      type: String,
      required: [true, '登入者id為必填'],
    },
    // 發文內容
    content: {
      type: String,
      required: [true, '內容為必填'],
    },
    // 建立時間，轉為 Timestamp 以方便前端好處理
    createdAt: {
      type: Number,
    },

    // 更新時間，轉為 Timestamp 以方便前端好處理
    updatedAt: {
      type: Number,
    },
    // 完成時間，轉為 Timestamp 以方便前端好處理
    completed_at: {
      type: Number,
    },
  },
  { 
    versionKey: false,
    timestamps: {
      currentTime: () => Date.now()
    }
  },
)

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo