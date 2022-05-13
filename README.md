
<div align="center">
  <a href="https://github.com/ayugioh2003/todolist-backend">
    <img src="./logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Todolist Backend</h3>

  <p align="center">
    📗 待辦清單 API in Node.js
    <br />
    <a href="https://github.com/ayugioh2003/todolist-backend/issues">Report Bug</a>
    ·
    <a href="http:localhost:3005">Demo</a>
    ·
    <a href="http:localhost:3005/apidoc">API 文件</a>
  </p>
</div>

## 🛖 About This Project
待辦清單

功能面
* 功能一：會員登入註冊
* 功能二：待辦事項管理

## 🔨 後端規格
- URL
  - 遠端：待處理
  - 本地端：http://localhost:3005
- 本地開發資料庫：mongodb://localhost:27017/todolist-backend

### Collection

- users
- todos

## 🔨 Built With
此專案會用到的 Framework / Library 或工具

* [Nodejs](https://github.com/nodejs)
* [Heroku](https://www.heroku.com/)
* [Git](https://git-scm.com/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Mongoose](https://mongoosejs.com/)
* [Vercel](https://vercel.com/)

## 👨‍💻 Getting Started
以下照著範例做，可以讓你在本地端 run 此專案

1. Clone the Repo
  ```sh
    git clone git@github.com:ayugioh2003/todolist-backend.git
  ```
2. Install NPM packages
  ```
  cd todolist-backend
  npm install
  ```
3. Copy .env.example to .env
  ```
  cp .env.example .env
  填上小組共用的 DATABASE、DATABASE_PASSWORD
  ```
4. Start Runing Server
  使用 Nodemon，存檔後會立即更新程式碼，不需重啟 nodejs
  ```
  npm run dev
  ```
