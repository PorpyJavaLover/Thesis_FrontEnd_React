import axios from 'axios';
import jwt_decode from "jwt-decode";
import BaseAPIService from './BaseAPIService';

export default new class PlanAPIService extends BaseAPIService {

}

export const PlanAPIServiceTeacher = new class PlanAPIServiceTeacher extends BaseAPIService {

    getPlan(yId, sId, groupId) {
        return axios.get(this.url + '/plan/staff/show/all'+ '/' + yId + '/' + sId + '/' + groupId, { headers: this.headers });
    }

}

export const PlanAPIServiceStaff = new class PlanAPIServiceStaff extends BaseAPIService {

    getPlan(yId, sId, groupId) {
        return axios.get(this.url + '/plan/staff/show/all'+ '/' + yId + '/' + sId + '/' + groupId, { headers: this.headers });
    }

}