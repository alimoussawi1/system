import http from "./httpService";

export function login(username, password) {
    return http.post('/login', {
        username, password
    })

}