import axios from 'axios';
import jwt_decode from "jwt-decode";
import BaseAPIService from './BaseAPIService';

export default new class ReplaceTeachAPIService extends BaseAPIService {

}

export const ReplaceTeachAPIServiceTeacher = new class ReplaceTeachAPIServiceTeacher extends BaseAPIService {
    
    getAll() {
        return axios.get(this.url + '/replaceteach/teacher/show/all ', { headers: this.headers });
    }
    
    getMemberReplaceOption(replaceTeachId) {
        return axios.get(this.url + '/replaceteach/teacher/member/replace/option' + '/' + replaceTeachId , { headers: this.headers });
    }

    getPDFHead(replaceTeachId) {
        return axios.get(this.url + '/replaceteach/teacher/pdf/head' + '/' + replaceTeachId , { headers: this.headers });
    }

    getPDFBody(leaveTeachId , replaceTeachId) {
        return axios.get(this.url + '/replaceteach/teacher/pdf/body' + '/' + leaveTeachId + '/' + replaceTeachId , { headers: this.headers });
    }

    

    update(replaceTeachId,memberReplaceId) {
        const body = {
            'memberReplaceId': memberReplaceId,
        };
        return axios.put(this.url + '/replaceteach/teacher/update'  + '/' + replaceTeachId  , body , { headers: this.headers });
    }

    delete(replaceTeachId) {

        return axios.delete(this.url + '/replaceteach/teacher/delete'  + '/' + replaceTeachId , { headers: this.headers });
    }


}

export const ReplaceTeachAPIServiceStaff = new class ReplaceTeachAPIServiceStaff extends BaseAPIService {

}