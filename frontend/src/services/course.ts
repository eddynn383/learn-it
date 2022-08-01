import http from "../http-common";

class CourseDataService {
    getAll(page:number = 0) {
        return http.get(`/courses?page=${page}`);
    }

    get(id:string) {
        return http.get(`/courses?id=${id}`);
    }

    find(query:string, by:string="title", page:number=0) {
        return http.get(`courses?${by}=${query}&page=${page}`)
    }

    createCourse(data:any) {
        return http.post("/new-course", data)
    }

    updateCourse(data:any) {
        return http.post("/edit-course", data)
    }

    deleteCourse(id: string) {
        return http.delete(`/delete-course?id=${id}`)
    }
}

export default new CourseDataService();