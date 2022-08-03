import express from "express"
import UsersCtrl from "../controllers/users.controller.js"

const router = express.Router()

router.route("/users").get(UsersCtrl.apiGetUsers)
router.route("/users/:id").get(UsersCtrl.apiGetUserById)
// router.route("/users").post(UsersCtrl.apiPostUser)
// router.route("/users").patch(UsersCtrl.apiUpdateUser)
// router.route("/users").delete(UsersCtrl.apiDeleteUser)

export default router