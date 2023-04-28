import axios from 'axios';
import jwt_decode from "jwt-decode";
import BaseAPIService from './BaseAPIService';
import DOMPurify from 'dompurify';

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

    register(titleNameSelected, organizSelected, firstNameTH, lastNameTH, firstNameEN, lastNameEN, usernameRe, passwordRe, roleSelected) {

        const body = {
            'titleNameSelected': DOMPurify.sanitize(titleNameSelected),
            'organizSelected': DOMPurify.sanitize(organizSelected),
            'firstNameTH': DOMPurify.sanitize(firstNameTH),
            'lastNameTH': DOMPurify.sanitize(lastNameTH),
            'firstNameEN': DOMPurify.sanitize(firstNameEN),
            'lastNameEN': DOMPurify.sanitize(lastNameEN),
            'usernameRe': DOMPurify.sanitize(usernameRe),
            'passwordRe': DOMPurify.sanitize(passwordRe),
            'roleSelected': DOMPurify.sanitize(roleSelected),
        };

        return axios.post(this.url + '/member/anonymous/register', body)
    }

    getAllFaculty() {
        return axios.get(this.url + '/organization/public/show/option/faculty');
    }

    getAllOrganiz(parent) {
        return axios.get(this.url + '/organization/public/show/option/organiz' + '/' + parent);
    }

    getAllTitleName() {
        return axios.get(this.url + '/title/public/show/option');
    }

}

export const MemberAPIServiceTeacher = new class MemberAPIServiceTeacher extends BaseAPIService {

}

export const MemberAPIServiceStaff = new class MemberAPIServiceStaff extends BaseAPIService {

    getMember() {
        return axios.get(this.url + '/member/staff/show/all', { headers: this.headers });
    }

    getMemberOption() {
        return axios.get(this.url + '/member/staff/show/option', { headers: this.headers });
    }

    update(memberId, titleNameSelected, firstNameTH, lastNameTH, firstNameEN,
        lastNameEN, usernameRe, passwordRe, roleSelected, activeStatusSelected) {

        const body = {
            'titleNameSelected': DOMPurify.sanitize(titleNameSelected),
            'firstNameTH': DOMPurify.sanitize(firstNameTH),
            'lastNameTH': DOMPurify.sanitize(lastNameTH),
            'firstNameEN': DOMPurify.sanitize(firstNameEN),
            'lastNameEN': DOMPurify.sanitize(lastNameEN),
            'usernameRe': DOMPurify.sanitize(usernameRe),
            'passwordRe': DOMPurify.sanitize(passwordRe),
            'roleSelected': DOMPurify.sanitize(roleSelected),
            'activeStatusSelected': DOMPurify.sanitize(activeStatusSelected)
        };

        return axios.put(this.url + '/member/staff/update' + '/' + memberId, body, { headers: this.headers });
    }

    delete(memberId) {
        return axios.delete(this.url + '/member/staff/delete' + '/' + memberId, { headers: this.headers });
    }
}

export const MemberAPIServiceAdmin = new class MemberAPIServiceStaff extends BaseAPIService {

    getMember(organiz) {
        console.log(organiz);
        return axios.get(this.url + '/member/admin/show/all' + '/' + organiz, { headers: this.headers });
    }

    getMemberOption( organiz) {
        return axios.get(this.url + '/member/admin/show/option' + '/' + organiz, { headers: this.headers });
    }

    rolePlay(memberId) {
        const body = {
            'memberId': memberId,
        };
        return axios.post(this.url + '/member/admin/role/play', body , { headers: this.headers })
            .then(response => {
                if(localStorage.getItem('tokenTmp') == null) {
                    localStorage.setItem('tokenTmp', localStorage.getItem('token'));
                    localStorage.setItem('member_idTmp', localStorage.getItem('member_id'));
                    localStorage.setItem('roleTmp', localStorage.getItem('role'));
                    localStorage.setItem('expTmp', localStorage.getItem('exp'));
                    localStorage.setItem('nameTmp', localStorage.getItem('name'));
                }
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('member_id', jwt_decode(JSON.parse(localStorage.getItem('token'))).principal);
                localStorage.setItem('role', jwt_decode(JSON.parse(localStorage.getItem('token'))).role);
                localStorage.setItem('exp', jwt_decode(JSON.parse(localStorage.getItem('token'))).exp);
                localStorage.setItem('name', jwt_decode(JSON.parse(localStorage.getItem('token'))).name);
                window.location.reload(false);
            }).catch((err) => {
                /*if (err.message === 'Network Error') {
                    console.log('Connection Refused');
                }*/
            }).finally(() => {

            });
    }

}