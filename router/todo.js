const express = require('express')

const router = express.Router()
const todoController = require('../controller/todo.js')
const { isAuth } = require('../middlewares/isAuth')

router
  .route('/')
  .get(isAuth, todoController.getTodo) // 取得 TODO 列表
  .post(isAuth, todoController.createTodo) // 新增 TODO

router
  .route('/:todo_id')
  .put(todoController.editTodo) // 取得單一貼文
  .delete(todoController.deleteTodo) // 修改單一貼文
  
router.route('/:todo_id/toggle')
  .patch(todoController.toggleTodo)

module.exports = router
