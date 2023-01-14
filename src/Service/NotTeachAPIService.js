import axios from 'axios';
import jwt_decode from "jwt-decode";
import BaseAPIService from './BaseAPIService';

export default new class NotTeachAPIService extends BaseAPIService {

}

export const NotTeachAPIServiceTeacher = new class NotTeachAPIServiceTeacher extends BaseAPIService {

    getAllNotTeach() {
        return axios.get(this.url + '/notteach/teacher/show/all', { headers: this.headers });
    }

    createNotTeach(dayOfWeek, timeStart, timeEnd) {
        const body = {
            'dayOfWeek': dayOfWeek,
            'timeStart': timeStart,
            'timeEnd': timeEnd
        };
        return axios.post(this.url + '/notteach/teacher/create', body, { headers: this.headers });
    }

    updateNotTeach(notId, dayOfWeek, timeStart, timeEnd) {

        const body = {
            'dayOfWeek': dayOfWeek,
            'timeStart': timeStart,
            'timeEnd': timeEnd
        };
        return axios.put(this.url + '/notteach/teacher/update' + '/' + notId, body, { headers: this.headers });
    }

    deleteNotTeach(notId) {
        return axios.delete(this.url + '/notteach/teacher/delete' + '/' + notId, { headers: this.headers });
    }

}

export const NotTeachAPIServiceStaff = new class NotTeachAPIServiceStaff extends BaseAPIService {

}