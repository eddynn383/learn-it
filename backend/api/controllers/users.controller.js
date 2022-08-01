import UsersDAO from "../../dao/users.dao.js"

export default class UsersController {
    static async apiGetUsers(req, res, next) {
        const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 5
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.type) {
            filters.type = req.query.type
        } else if (req.query.name) {
            filters.name = req.query.name
        }

        const { usersList, totalNumUsers} = await UsersDAO.getUsers({
            filters,
            page,
            usersPerPage,
        })

        let response = {
            users: usersList,
            page: page,
            filters: filters,
            entries_per_page: usersPerPage,
            total_results: totalNumUsers,
        }
        res.json(response)
    }

    static async apiGetUserById(req, res, next) {
        try {
            let id = req.params.id || {}
            let user = await UsersDAO.getUserByID(id)
            if (!user) {
                res.status(404).json({error: "Not Found"})
                return
            }
            res.json(user)
        } catch (err) {
            console.error(`Error to find ${err}`)
            res.status(500).json({ error: err })
        }
    }

    // static async apiPostUser(req, res, next) {
    //     try {
    //         const userType = req.body.type
    //         const userTitle = req.body.name
    //         const userDesc = req.body.desc
    //         const userLanguage = req.body.language
    //         const userContent = req.body.content

    //         const userResponse = await UsersDAO.addUser(
    //             userType,
    //             userTitle,
    //             userDesc,
    //             userLanguage,
    //             userContent
    //         )

    //         res.json({ status: "success" })
    //     } catch (err) {
    //         res.status(500).json({ error: err.message })
    //     }
    // }

    // static async apiUpdateUser(req, res, next) {
    //     try {
    //         const userId = req.body._id
    //         const userTitle = req.body.name
    //         const userDesc = req.body.desc
    //         const userLanguage = req.body.language
    //         const userContent = req.body.content

    //         const userResponse = await UsersDAO.updateUser(
    //             userId,
    //             userTitle,
    //             userDesc,
    //             userLanguage,
    //             userContent
    //         )

    //         var { error } = userResponse
    //         if (error) {
    //             res.status(400).json({ error })
    //         }
    //         if (userResponse.modifiedCount === 0) {
    //             throw new Error(
    //               "unable to update review - user may not be original poster",
    //             )
    //         }

    //         res.json({ status: "success" })
    //     } catch (err) {
    //         res.status(500).json({ error: err.message })
    //     }
    // }

    // static async apiDeleteUser(req, res, next) {
    //     try {
    //         const userId = req.body._id
    //         const userResponse = await UsersDAO.deleteUser(userId)
    //         res.json({ status: "success" })
    //     } catch (err) {
    //         res.status(500).json({ error: err.message })
    //     }
    // }
}