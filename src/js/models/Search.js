import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResult() {
        const proxy2 = 'https://crossorigin.me/';
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const url = 'http://food2fork.com/api/search';
        const key = '5fd55b334f36e157a895f66ba4550db0';

        try {
            const res = await axios.get(`${proxy}${url}?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        } catch (error) {
            alert(error);
        }
    };

}