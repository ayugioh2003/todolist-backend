// Model
const Todo = require('../model/todo.js')
const ApiState = require('../utils/apiState.js')
const AppError = require('../utils/appError.js')
// Utils
const catchAsync = require('../utils/catchAsync')
const { successHandle } = require('../utils/resHandle.js')

// 取得待辦列表 GET /todos
const getTodo = catchAsync(async (req, res) => {
  const user_id = req.user._id

  const data = await Todo.find({ user_id })

  successHandle({ res, message: '取得待辦列表成功', data })
})

// 新增待辦  POST /todos
const createTodo = catchAsync(async (req, res, next) => {
  const { content } = req.body

  if (!content) return next(new AppError(ApiState.FIELD_MISSING))

  const data = await Todo.create({
    user_id: req.user._id,
    content
  })

  successHandle({ res, message: '新增待辦成功', data })
})

// 編輯待辦  PUT /todos/:todo_id
const editTodo = catchAsync(async (req, res, next) => {
  res.json({
      "id": "7ee245b09ff5b738b01f83ee5dabadfa",
      "content": "string"
    })
})

// 刪除待辦  DELETE /todos/:todo_id
const deleteTodo = catchAsync(async (req, res, next) => {
  res.json({
    "message": "已刪除"
  }
  )
})

// 切換待辦完成狀態  PATCH /todos/:todo_id/toggle
const toggleTodo = catchAsync(async (req, res, next) => {
  res.json({
    "id": "ec7ebef6fa77ed77cc7392439231c4b8",
    "content": "string",
    "completed_at": "2022-05-13T17:21:18.856+08:00"
  }
  )
})


module.exports = {
  getTodo,
  createTodo,
  editTodo,
  deleteTodo,
  toggleTodo
}
