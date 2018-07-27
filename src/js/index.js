import axios from 'axios'; 


// http://food2fork.com/api/search 



async function getRequest () {
    
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = 'http://food2fork.com/api/search';
    const key = 'PPP5fd55b334f36e157a895f66ba4550db0';

    try {
        const res = await axios.get(`${proxy}${url}?key=${key}`);
        const recipes = res.data.recipes;
        console.log(recipes);       
    } catch (error) {
        alert(error);
    }
};

getRequest();