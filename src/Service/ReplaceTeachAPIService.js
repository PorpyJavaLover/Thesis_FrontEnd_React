import axios from 'axios';
import jwt_decode from "jwt-decode";
import BaseAPIService from './BaseAPIService';

export default new class ReplaceTeachAPIService extends BaseAPIService {

}

export const ReplaceTeachAPIServiceTeacher = new class ReplaceTeachAPIServiceTeacher extends BaseAPIService {
    
    getAll() {
        return axios.get(this.url + '/replaceteach/teacher/show/all ', { headers: this.headers });
    }

    getMemberReplaceOption() {
        return axios.get(this.url + '/replaceteach/teacher/member/replace/option' , { headers: this.headers });
    }

}

export const ReplaceTeachAPIServiceStaff = new class ReplaceTeachAPIServiceStaff extends BaseAPIService {

}