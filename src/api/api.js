import axios from 'axios';

export default axios.create({
    baseURL: 'https://ServerRaliel-1.extremegame300.repl.co',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

