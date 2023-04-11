const { BookApi } = require("./books")
const { UserApi } = require("./user")
const {AuthorApi } = require("./authors")
const {OrderApi } = require("./orders")
const {ChatApi } = require("./chats")


const BackendApi = {
  book: BookApi,
  user: UserApi,
  author:AuthorApi,
  order:OrderApi,
  chat:ChatApi
}

module.exports = { BackendApi }
