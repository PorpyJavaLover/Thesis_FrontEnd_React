const API_REST_URL = 'http://localhost:8080';

//const API_REST_URL = 'http://192.168.1.19:8080';

const HEADER = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')) };

export default class BaseAPIService {

    constructor() {
        this.url = API_REST_URL;
        this.headers = HEADER;
    }

}