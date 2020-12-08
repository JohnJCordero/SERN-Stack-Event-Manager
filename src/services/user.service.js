import http from "../http-common";

class UserDataService {


    create(data) {
        return http.post("/users", data);
    }

    login(data){
        return http.post('/users/login', data)
   }

    delete(id) {
        return http.delete(`/users/${id}`);
    }

    update(id, data){
        return http.put(`/users/${id}`,data)
    }
    findAll() {
        return http.get('/users')
    }



}

export default new UserDataService();