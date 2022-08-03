import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let courses
let movies

export default class CoursesDAO {
    static async injectDB(conn) {
        if (courses) {
            return
        }
        try {
            courses = await conn.db(process.env.RESTLEARNIT_NS).collection("courses")
            movies = await conn.db(process.env.RESTMFLIX_NS).collection("movies")
        } catch (e) {
            console.error(`Unable to establish a collection handle in coursesDAO: ${e}`)
        }
    }

    static async getCourses({
        filters = null,
        page = 0,
        coursesPerPage = 10
    } = {}) {
        let searchPipeline 
        let countPipeline

        try {
            if ("title" in filters) {
                searchPipeline = [{
                    $search: {
                        'index': 'default',
                        'text': {
                            'query': filters['title'],
                            'path': 'title'
                        }
                    }
                }, {
                    '$limit': coursesPerPage
                }, {
                    '$skip': coursesPerPage * page
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
            } else if ("type" in filters) {
                searchPipeline = [{
                    '$match': {
                        'type': filters["type"]
                    }
                }, {
                    '$limit': coursesPerPage
                }, {
                    '$skip': coursesPerPage * page
                }]

                countPipeline = [{
                    $search: {
                        'index': 'default',
                        'text': {
                            'query': filters['type'],
                            'path': 'type'
                        }
                    }
                }, {
                    '$count': 'totalNumber'
                }]
            } else {
                searchPipeline = [{
                    '$limit': coursesPerPage
                }, {
                    '$skip': coursesPerPage * page
                }]
                countPipeline = [{
                    '$count': 'totalNumber'
                }]
            }

            const searchResults = await courses.aggregate(searchPipeline).toArray()
            const searchNoResults = await courses.aggregate(countPipeline).toArray()

            return { coursesList: searchResults, totalNumCourses: searchNoResults[0].totalNumber }
        } catch (err) {
            console.error(`Something went wrong in getCourses: ${err}`)
        }
    }

    static async getCourseByID(id) {
        try {
            const pipeline = [{
                $match: {
                    _id: new ObjectId(id),
                },
            }]
            return courses.aggregate(pipeline).next()
        } catch (err) {
            console.error(`Something went wrong in getCourseByID: ${err}`)
            throw err
        }
    }

    static async addCourse(courseType, courseTitle, courseDesc, courseLanguage, courseContent) {
        try {
            const courseDoc = {
                type: courseType,
                title: courseTitle,
                desc: courseDesc,
                language: courseLanguage,
                content: courseContent
            }
            return await courses.insertOne(courseDoc)
        } catch (err) {
            console.error(`Unable to post the course: ${err}`)
            return {
                error: err
            }
        }
    }

    static async updateCourse(courseId, courseType, courseTitle, courseDesc, courseLanguage, courseContent) {
        try {
            const updateResponse = await courses.updateOne({
                _id: ObjectId(courseId),
            }, { 
                $set: {                
                    type: courseType,
                    title: courseTitle,
                    desc: courseDesc,
                    language: courseLanguage,
                    content: courseContent
                }
            })
            return updateResponse
        } catch (err) {
            console.error(`Unable to update the course: ${err}`)
            return {
                error: err
            }
        }
    }

    static async deleteCourse(courseId) {
        try {
            const deleteResponse = await courses.deleteOne({
                _id: ObjectId(courseId)
            })
            
            return deleteResponse
        } catch (err) {
            console.error(`Unable to delete the course: ${err}`)
            return { error: err }
        }
    }
}