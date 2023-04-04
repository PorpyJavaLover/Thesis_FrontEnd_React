
import jwt_decode from "jwt-decode";
import axios from 'axios';

const API_REST_URL = 'http://localhost:8080';

//const API_REST_URL = 'http://192.168.1.19:8080';

const headers = {
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
};

class FernAPIService {

    createLeaveTeach(semester, year, dateStart, dateEnd, note) {
        const body = {
            'semester': semester,
            'year': year,
            'dateStart': dateStart,
            'dateEnd': dateEnd,
            'note': note
        };
        return axios.post(API_REST_URL + '/leaveteach/teacher/create ', body, { headers });
    }

    updateTeacherLeaveTeach(leaveTeachId, year, semester, dateStart, dateEnd, reasonNote) {
        const body = {
            'year': year,
            'semester': semester,
            'dateStart': dateStart,
            'dateEnd': dateEnd,
            'note': reasonNote,
        };
        return axios.put(API_REST_URL + '/leaveteach/teacher/update' + '/' + leaveTeachId , body, { headers });
    }

    deleteTeacherLeaveTeach(leaveTeachId) {
        return axios.delete(API_REST_URL + '/leaveteach/teacher/delete' + '/' + leaveTeachId, { headers });
    }


    showAllTeacherLeaveTeach() {
        return axios.get(API_REST_URL + '/leaveteach/teacher/show/all ', { headers });
    }


    getAllOrganization() {
        return axios.get(API_REST_URL + '/organization/public/show/select');
    }

}

export default new FernAPIService();