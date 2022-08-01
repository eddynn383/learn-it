import express from "express"
import CoursesCtrl from "../controllers/courses.controller.js"

const router = express.Router()

router.route("/courses").get(CoursesCtrl.apiGetCourses)
router.route("/courses/:id").get(CoursesCtrl.apiGetCourseById)
router.route("/courses").post(CoursesCtrl.apiPostCourse)
router.route("/courses").patch(CoursesCtrl.apiUpdateCourse)
router.route("/courses").delete(CoursesCtrl.apiDeleteCourse)

export default router