import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let users

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.RESTLEARNIT_NS).collection("users")
        } catch (e) {
            console.error(`Unable to establish a collection handle in usersDAO: ${e}`)
        }
    }

    static async getUsers({
        filters = null,
        page = 0,
        usersPerPage = 5
    } = {}) {
        let searchPipeline 
        let countPipeline

        try {
            if ("name" in filters) {
                searchPipeline = [{
                    $search: {
                        'index': 'default',
                        'text': {
                            'query': filters['name'],
                            'path': 'name'
                        }
                    }
                }, {
                    '$limit': usersPerPage
                }, {
                    '$skip': usersPerPage * page
                }]

                countPipeline = [{
                    $search: {
                        'index': 'default',
                        'text': {
                            'query': filters['title'],
                            'path': 'title'
                        }
                    }
                }, {
                    '$count': 'totalNumber'
                }]
            } else {
                searchPipeline = [{
                    '$limit': usersPerPage
                }, {
                    '$skip': usersPerPage * page
                }]
                countPipeline = [{
                    '$count': 'totalNumber'
                }]
            }

            const searchResults = await users.aggregate(searchPipeline).toArray()
            const searchNoResults = await users.aggregate(countPipeline).toArray()

            return { usersList: searchResults, totalNumUsers: searchNoResults[0].totalNumber }
        } catch (err) {
            console.error(`Something went wrong in getUsers: ${err}`)
        }
    }

    static async getUserByID(id) {
        try {
            const pipeline = [{
                $match: {
                    _id: new ObjectId(id),
                },
            }]
            return users.aggregate(pipeline).next()
        } catch (err) {
            console.error(`Something went wrong in getUserByID: ${err}`)
            throw err
        }
    }

    // static async addUser(userType, userTitle, userDesc, userLanguage, userContent) {
    //     try {
    //         const userDoc = {
    //             type: userType,
    //             title: userTitle,
    //             desc: userDesc,
    //             language: userLanguage,
    //             content: userContent
    //         }
    //         return await users.insertOne(userDoc)
    //     } catch (err) {
    //         console.error(`Unable to post the user: ${err}`)
    //         return {
    //             error: err
    //         }
    //     }
    // }

    // static async updateUser(userId, userType, userTitle, userDesc, userLanguage, userContent) {
    //     try {
    //         const updateResponse = await users.updateOne({
    //             _id: ObjectId(userId),
    //         }, { 
    //             $set: {                
    //                 type: userType,
    //                 title: userTitle,
    //                 desc: userDesc,
    //                 language: userLanguage,
    //                 content: userContent
    //             }
    //         })
    //         return updateResponse
    //     } catch (err) {
    //         console.error(`Unable to update the user: ${err}`)
    //         return {
    //             error: err
    //         }
    //     }
    // }

    // static async deleteUser(userId) {
    //     try {
    //         const deleteResponse = await users.deleteOne({
    //             _id: ObjectId(userId)
    //         })
            
    //         return deleteResponse
    //     } catch (err) {
    //         console.error(`Unable to delete the user: ${err}`)
    //         return { error: err }
    //     }
    // }
}