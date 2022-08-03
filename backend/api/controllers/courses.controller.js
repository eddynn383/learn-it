import CoursesDAO from "../../dao/courses.dao.js"

export default class CoursesController {
    static async apiGetCourses(req, res, next) {
        const coursesPerPage = req.query.coursesPerPage ? parseInt(req.query.coursesPerPage, 10) : 10
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.type) {
            filters.type = req.query.type
        } else if (req.query.title) {
            filters.title = req.query.title
        }

        const { coursesList, totalNumCourses} = await CoursesDAO.getCourses({
            filters,
            page,
            coursesPerPage,
        })

        let response = {
            courses: coursesList,
            page: page,
            filters: filters,
            entries_per_page: coursesPerPage,
            total_results: totalNumCourses,
        }
        res.json(response)
    }

    static async apiGetCourseById(req, res, next) {
        try {
            let id = req.params.id || {}
            let course = await CoursesDAO.getCourseByID(id)
            if (!course) {
                res.status(404).json({error: "Not Found"})
                return
            }
            res.json(course)
        } catch (err) {
            console.error(`Error to find ${err}`)
            res.status(500).json({ error: err })
        }
    }

    static async apiPostCourse(req, res, next) {
        try {
            const courseType = req.body.type
            const courseTitle = req.body.title
            const courseDesc = req.body.desc
            const courseLanguage = req.body.language
            const courseContent = req.body.content

            const courseResponse = await CoursesDAO.addCourse(
                courseType,
                courseTitle,
                courseDesc,
                courseLanguage,
                courseContent
            )

            res.json({ status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async apiUpdateCourse(req, res, next) {
        try {
            const courseId = req.body._id
            const courseTitle = req.body.title
            const courseDesc = req.body.desc
            const courseLanguage = req.body.language
            const courseContent = req.body.content

            const courseResponse = await CoursesDAO.updateCourse(
                courseId,
                courseTitle,
                courseDesc,
                courseLanguage,
                courseContent
            )

            var { error } = courseResponse
            if (error) {
                res.status(400).json({ error })
            }
            if (courseResponse.modifiedCount === 0) {
                throw new Error(
                  "unable to update review - user may not be original poster",
                )
            }

            res.json({ status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async apiDeleteCourse(req, res, next) {
        try {
            const courseId = req.body._id
            const courseResponse = await CoursesDAO.deleteCourse(courseId)
            res.json({ status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}