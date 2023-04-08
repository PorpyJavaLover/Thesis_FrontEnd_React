import axios from 'axios';
import jwt_decode from "jwt-decode";

const API_REST_URL = 'http://localhost:8080';

//const API_REST_URL = 'http://192.168.1.19:8080';

const headers = {
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
};

export default new class APIService {

    //
    getPlan() {
        return axios.get(API_REST_URL + '/plan/teacher/show/all', { headers });
    }

    //
    getAllPlan() {
        return axios.get(API_REST_URL + '/plan/show/staff/all', { headers });
    }

    //
    getTimetable() {
        return axios.get(API_REST_URL + '/timetable/teacher/show/all', { headers });
    }

    //
    getTimetableStaff() {
        return axios.get(API_REST_URL + '/timetable/staff/show/all', { headers });
    }

    //
    getMemberTime(mId) {
        return axios.get(API_REST_URL + '/timetable/teacher/show/member/time/'+ mId, { headers });
    }

    //
    getStartTime(yId,sId,cId,gId,dayOfWeek,endTime) {
        return axios.get(API_REST_URL + '/timetable/staff/show/start/time'+ '/' + yId + '/' + sId + '/' + cId + '/' + gId +'/' + dayOfWeek +'/' + endTime , { headers });
    }

    //
    getEndTime(yId,sId,cId,gId,dayOfWeek,startTime) {
        return axios.get(API_REST_URL + '/timetable/staff/show/end/time'+ '/' + yId + '/' + sId + '/' + cId + '/' + gId +'/' + dayOfWeek +'/' + startTime, { headers });
    }

    //
    updateDayAndTimeStaff(yId,sId,cId,gId,dayOfWeek,timeStart,timeEnd) {
        const body = {
            'day_of_week': dayOfWeek,
            'start_time': timeStart,
            'end_time': timeEnd
        };
        return axios.put(API_REST_URL + '/timetable/staff/update/daytime' + '/' + yId + '/' + sId + '/' + cId + '/' + gId , body, { headers });
    }


    //
    getAllMemberStaff() {
        return axios.get(API_REST_URL + '/member/staff/show/all', { headers });
    }

    //
    getAllNotTeach() {
        return axios.get(API_REST_URL + '/notteach/teacher/show/all', { headers });
    }

    //
    createNotTeach(dayOfWeek, timeStart, timeEnd) {
        const body = {
            'dayOfWeek': dayOfWeek,
            'timeStart': timeStart,
            'timeEnd': timeEnd
        };
        return axios.post(API_REST_URL + '/notteach/teacher/create', body, { headers });
    }


    //
    updateNotTeach(notId, dayOfWeek, timeStart, timeEnd) {

        const body = {
            'dayOfWeek': dayOfWeek,
            'timeStart': timeStart,
            'timeEnd': timeEnd
        };
        return axios.put(API_REST_URL + '/notteach/teacher/update' + '/' + notId, body, { headers });
    }

    //
    deleteNotTeach(notId) {
        return axios.delete(API_REST_URL + '/notteach/teacher/delete' + '/' + notId, { headers });
    }

    //
    createTimetable(yId, sId, cId, gId) {
        const body = {
            'years': yId,
            'semester': sId,
            'courseId': cId,
            'groupId': gId
        };
        return axios.post(API_REST_URL + '/timetable/teacher/create ', body, { headers });
    }

    //
    deletTimetable(yId, sId, cId, gId) {
        return axios.delete(API_REST_URL + '/timetable/teacher/delete/forPlan' + '/' + yId + '/' + sId + '/' + cId + '/' + gId, { headers });
    }

    //
    createTimetableStaff(yId, sId, cId, gId, mId) {
        const body = {
            'years': yId,
            'semester': sId,
            'courseId': cId,
            'groupId': gId,
            'memberId': mId
        };
        return axios.post(API_REST_URL + '/timetable/create/staff ', body, { headers });
    }

    //
    deletTimetableStaff(yId, sId, cId, gId, mId) {
        axios.delete(API_REST_URL + '/timetable/delete/teaching/staff' + '/' + yId + '/' + sId + '/' + cId + '/' + gId + '/' + mId, { headers });
    }

    //
    login(username, password) {
        const body = {
            'username': username,
            'password': password
        };
        axios.post(API_REST_URL + '/member/anonymous/login', body)
            .then(response => {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('member_id', jwt_decode(JSON.parse(localStorage.getItem('token'))).role);
                localStorage.setItem('role', jwt_decode(JSON.parse(localStorage.getItem('token'))).role);
                localStorage.setItem('exp', jwt_decode(JSON.parse(localStorage.getItem('token'))).exp );
            }).catch((test) => {
                console.log(test.response.data.error);
            });
    }

}
