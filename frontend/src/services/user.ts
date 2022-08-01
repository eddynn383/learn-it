import http from "../http-common";

class UserDataService {
    getAll(page:number = 0) {
        return http.get(`/users?page=${page}`);
    }

    get(id:string) {
        return http.get(`/users?id=${id}`);
    }

    find(query:string, by:string="title", page:number=0) {
        return http.get(`users?${by}=${query}&page=${page}`)
    }

    createUser(data:any) {
        return http.post("/new-user", data)
    }

    updateUser(data:any) {
        return http.post("/edit-user", data)
    }

    deleteUser(id: string) {
        return http.delete(`/delete-user?id=${id}`)
    }
}

export default new UserDataService();