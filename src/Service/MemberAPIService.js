import axios from 'axios';
import jwt_decode from "jwt-decode";
import BaseAPIService from './BaseAPIService';

export default new class MemberAPIService extends BaseAPIService  {


    login(username, password) {
        const body = {
            'username': username,
            'password': password
        };
        axios.post(this.url + '/member/anonymous/login', body)
            .then(response => {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('user', JSON.stringify(jwt_decode(JSON.parse(localStorage.getItem('token')))));
            }).catch((test) => {
                console.log(test.response.data.error);
            });
    }

}

export const MemberAPIServiceTeacher = new class MemberAPIServiceTeacher extends BaseAPIService {

}

export const MemberAPIServiceStaff = new class MemberAPIServiceStaff extends BaseAPIService {

    getAllMember() {
        return axios.get(this.url + '/member/staff/show/all', { headers: this.headers });
    } 

}