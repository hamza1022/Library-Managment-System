const { BookApi } = require("./books")
const { UserApi } = require("./user")
const {AuthorApi } = require("./authors")

const BackendApi = {
  book: BookApi,
  user: UserApi,
  author:AuthorApi,
}

module.exports = { BackendApi }
