import axios from 'axios';
import jwt_decode from "jwt-decode";
import BaseAPIService from './BaseAPIService';

export default new class LeaveTeachAPIService extends BaseAPIService {

}

export const LeaveTeachAPIServiceTeacher = new class LeaveTeachAPIServiceTeacher extends BaseAPIService {

    getAllTeacherLeaveTeach(years , semester) {
        return axios.get(this.url + '/leaveteach/teacher/show/all' + '/' + years + '/' + semester  , { headers: this.headers });
    }

    getAllOrganization() {
        return axios.get(this.url + '/organization/public/show/select');
    }

    createLeaveTeach(semester, year, dateStart, dateEnd, note) {
        const body = {
            'semester': semester,
            'year': year,
            'dateStart': dateStart,
            'dateEnd': dateEnd,
            'note': note
        };
        return axios.post(this.url + '/leaveteach/teacher/create ', body, { headers: this.headers });
    }

    updateTeacherLeaveTeach(leaveTeachId, years, semester, dateStart, dateEnd, reasonNote) {
        const body = {
            'years': years,
            'semester': semester,
            'dateStart': dateStart,
            'dateEnd': dateEnd,
            'note': reasonNote,
        };
        return axios.put(this.url + '/leaveteach/teacher/update' + '/' + leaveTeachId , body, { headers: this.headers });
    }

    deleteTeacherLeaveTeach(leaveTeachId) {
        return axios.delete(this.url + '/leaveteach/teacher/delete' + '/' + leaveTeachId, { headers: this.headers });
    }

}

export const LeaveTeachAPIServiceStaff = new class LeaveTeachAPIServiceStaff extends BaseAPIService {

    getAllStaffLeaveTeach(years , semester, memberId) {
        return axios.get(this.url + '/leaveteach/staff/show/all' + '/' + years + '/' + semester + '/' + memberId, { headers: this.headers });
    }

    createLeaveTeach(semester, year, memberId , dateStart, dateEnd, note) {
        const body = {
            'semester': semester,
            'year': year,
            'memberId' : memberId,
            'dateStart': dateStart,
            'dateEnd': dateEnd,
            'note': note
        };
        return axios.post(this.url + '/leaveteach/staff/create ', body, { headers: this.headers });
    }

}