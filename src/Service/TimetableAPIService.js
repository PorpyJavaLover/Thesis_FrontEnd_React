import axios from 'axios';
import jwt_decode from "jwt-decode";
import BaseAPIService from './BaseAPIService';

export default new class TimetableAPIService extends BaseAPIService {

}

export const TimetableAPIServiceTeacher = new class TimetableAPIServiceTeacher extends BaseAPIService {

    getTimetableForPlan() {
        return axios.get(this.url + '/timetable/teacher/show/all/ForPlan', { headers: this.headers });
    }

    getTimetable() {
        return axios.get(this.url + '/timetable/teacher/show/all', { headers: this.headers });
    }

    getMemberTime(mId) {
        return axios.get(this.url + '/timetable/teacher/show/member/time/' + mId, { headers: this.headers });
    }

    createTimetable(yId, sId, cId , cType, gId) {
        const body = {
            'years': yId,
            'semester': sId,
            'courseId': cId,
            'courseType' : cType,
            'groupId': gId
        };
        return axios.post(this.url + '/timetable/teacher/create ', body, { headers: this.headers });
    }

    deletTimetable(yId, sId, cId , cType, gId) {
        return axios.delete(this.url + '/timetable/teacher/delete/forPlan' + '/' + yId + '/' + sId + '/' + cId + '/'+ cType + '/' + gId, { headers: this.headers });
    }

}

export const TimetableAPIServiceStaff = new class TimetableAPIServiceStaff extends BaseAPIService {

    getTimetableByMemberId(memberId) {
        return axios.get(this.url + '/timetable/staff/show/all' + '/' + memberId, { headers: this.headers });
    }

    getTimetable() {
        return axios.get(this.url + '/timetable/staff/show/all', { headers: this.headers });
    }

    getStartTime(yId, sId, cId, cType, gId, dayOfWeek, endTime) {
        return axios.get(this.url + '/timetable/staff/show/start/time' + '/' + yId + '/' + sId + '/' + cId + '/' + cType + '/' + gId + '/' + dayOfWeek + '/' + endTime, { headers: this.headers });
    }

    getStartTimeOption(yId, sId, cId, cType, gId, dayOfWeek, endTime) {
        return axios.get(this.url + '/timetable/staff/show/start/time/option' + '/' + yId + '/' + sId + '/' + cId + '/' + cType + '/' + gId + '/' + dayOfWeek + '/' + endTime, { headers: this.headers });
    }

    getEndTime(yId, sId, cId, cType, gId, dayOfWeek, startTime) {
        return axios.get(this.url + '/timetable/staff/show/end/time' + '/' + yId + '/' + sId + '/' + cId + '/' + cType + '/' + gId + '/' + dayOfWeek + '/' + startTime, { headers: this.headers });
    }

    getEndTimeOption(yId, sId, cId, cType, gId, dayOfWeek, startTime) {
        return axios.get(this.url + '/timetable/staff/show/end/time/option' + '/' + yId + '/' + sId + '/' + cId + '/' + cType + '/' + gId + '/' + dayOfWeek + '/' + startTime, { headers: this.headers });
    }

    getRoom(yId, sId, cId, cType, gId, dayOfWeek, startTime, endTime) {
        return axios.get(this.url + '/timetable/staff/show/room' + '/' + yId + '/' + sId + '/' + cId + '/' + cType + '/' + gId + '/' + dayOfWeek + '/' + startTime + '/' + endTime, { headers: this.headers });
    }

    autoPilot() {
        return axios.get(this.url + '/timetable/staff/auto_pilot', { headers: this.headers });
    }

    createTimetable(yId, sId, cId , cType, gId , mId) {
        const body = {
            'years': yId,
            'semester': sId,
            'courseId': cId,
            'courseType' : cType,
            'groupId': gId,
            'memberId': mId
        };
        return axios.post(this.url + '/timetable/staff/create', body, { headers: this.headers });
    }

    update(yId, sId, cId, cType, gId, dayOfWeek, timeStart, timeEnd, roomId) {
        const body = {
            'day_of_week': dayOfWeek,
            'start_time': timeStart,
            'end_time': timeEnd,
            'room_id': roomId,
        };
        return axios.put(this.url + '/timetable/staff/update' + '/' + yId + '/' + sId + '/' + cId + '/' + cType + '/' + gId, body, { headers: this.headers });
    }

    updateLocker(yId, sId, cId, cType, gId, timeLocker, roomLocker) {
        const body = {
            'time_locker': timeLocker,
            'room_locker': roomLocker
        };
        return axios.put(this.url + '/timetable/staff/update/locker' + '/' + yId + '/' + sId + '/' + cId  + '/' + cType + '/' + gId, body, { headers: this.headers });
    }

    deletTimetable(yId, sId, cId , cType, gId, memberId) {
        return axios.delete(this.url + '/timetable/staff/delete/forPlan' + '/' + yId + '/' + sId + '/' + cId + '/'+ cType + '/' + gId + '/' + memberId, { headers: this.headers });
    }

    clean(yId, sId, cId , cType, gId , dayOfWeek, startTime, endTime, roomId , timeLocker , roomLocker) {
        return axios.delete(this.url + '/timetable/staff/clean' + '/' + yId + '/' + sId + '/' + cId + '/'+ cType + '/' + gId + '/' + dayOfWeek + '/' + startTime + '/' + endTime + '/' + roomId + '/' + timeLocker + '/' + roomLocker  , { headers: this.headers });
    }

    cleanAll() {
        return axios.delete(this.url + '/timetable/staff/clean/all', { headers: this.headers });
    }

}
