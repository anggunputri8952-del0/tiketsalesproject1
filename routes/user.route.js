const express = require(`express`)
const app = express()

app.use(express.json())

const userController = require(`../controllers/user.controller`)   // "controllers" pakai s
const { midOne } = require("../middlewares/simple-middleware")
const { validateUser } = require("../middlewares/user-validation")
const { authorize } = require('../controllers/auth.controller')     // "controllers" pakai s
const { IsUser, IsAdmin } = require('../middlewares/role-validation')

app.post("/register", validateUser, userController.register)
app.put("/reset/:id", userController.resetPassword)   // resetPassword, bukan resetPwd
app.get("/", [midOne], authorize, IsAdmin, userController.getAllUser)
app.get("/:key", authorize, IsAdmin, userController.findUser)
app.post("/", authorize, IsAdmin, validateUser, userController.addUser)
app.put("/:id", authorize, IsUser, validateUser, userController.updateUser)
app.delete("/:id", authorize, IsAdmin, userController.deleteUser)

module.exports = app