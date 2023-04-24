import axios from 'axios';
import jwt_decode from "jwt-decode";
import BaseAPIService from './BaseAPIService';

export default new class MemberAPIService extends BaseAPIService {

    login(username, password) {
        const body = {
            'username': username,
            'password': password
        };
        return axios.post(this.url + '/member/anonymous/login', body)
            .then(response => {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('member_id', jwt_decode(JSON.parse(localStorage.getItem('token'))).principal);
                localStorage.setItem('role', jwt_decode(JSON.parse(localStorage.getItem('token'))).role);
                localStorage.setItem('exp', jwt_decode(JSON.parse(localStorage.getItem('token'))).exp);
                localStorage.setItem('name', jwt_decode(JSON.parse(localStorage.getItem('token'))).name);
                window.location.href = '/home';
            }).catch((err) => {
                if (err.message === 'Network Error') {
                    console.log('Connection Refused');
                }
            }).finally(() => {

            });
    }

    getAllOrganization() {
        return axios.get(this.url + '/organization/public/show/select');
    }

}

export const MemberAPIServiceTeacher = new class MemberAPIServiceTeacher extends BaseAPIService {

}

export const MemberAPIServiceStaff = new class MemberAPIServiceStaff extends BaseAPIService {

    getAllMember() {
        return axios.get(this.url + '/member/staff/show/all', { headers: this.headers });
    }

}