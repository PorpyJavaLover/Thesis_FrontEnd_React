import axios from 'axios';
import jwt_decode from "jwt-decode";
import BaseAPIService from './BaseAPIService';

export default new class LeaveTeachAPIService extends BaseAPIService {

}

export const LeaveTeachAPIServiceTeacher = new class LeaveTeachAPIServiceTeacher extends BaseAPIService {

    getAllTeacherLeaveTeach() {
        return axios.get(this.url + '/leaveteach/teacher/show/all ', { headers: this.headers });
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

    updateTeacherLeaveTeach(leaveTeachId, year, semester, dateStart, dateEnd, reasonNote) {
        const body = {
            'year': year,
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

}