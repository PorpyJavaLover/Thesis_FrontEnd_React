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

    getAllNotTeachByMemberId(memberId) {
        console.log("test 1234   "  +   memberId);
        return axios.get(this.url + '/notteach/staff/show/all' + '/' + memberId, { headers: this.headers });
    }

    createNotTeach(dayOfWeek, timeStart, timeEnd , mId) {
        console.log("test 5678   "  +   mId);
        const body = {
            'dayOfWeek': dayOfWeek,
            'timeStart': timeStart,
            'timeEnd': timeEnd,
            'memberId': mId
        };
        return axios.post(this.url + '/notteach/staff/create', body, { headers: this.headers });
    }

    updateNotTeach(notId, dayOfWeek, timeStart, timeEnd) {
        const body = {
            'dayOfWeek': dayOfWeek,
            'timeStart': timeStart,
            'timeEnd': timeEnd
        };
        return axios.put(this.url + '/notteach/staff/update' + '/' + notId, body, { headers: this.headers });
    }

    deleteNotTeach(notId) {
        return axios.delete(this.url + '/notteach/staff/delete' + '/' + notId, { headers: this.headers });
    }


}