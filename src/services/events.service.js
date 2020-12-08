import http from "../http-common";

class EventDataService {
    getAll() {
        return http.get("/events");
    }
    findAll() {
        return http.get("/events");
    }

    create(data) {
        return http.post("/events", data);
    }

    update(id, data) {
        return http.put(`/events/${id}`, data);
    }

    attendEvent(data) {
        return http.post("/events/attend",data);
    }
    unattendEvent(data) {
        return http.post("/events/unattend",data);
    }

    isAttending(data){
        return http.get('/events/isAttending', data)
    }

    listAttendedEvents(id){
        return http.post(`/events/listAttendedEvents`,id)
    }
    deleteAll() {
        return http.delete(`/events`);
    }
}

export default new EventDataService();