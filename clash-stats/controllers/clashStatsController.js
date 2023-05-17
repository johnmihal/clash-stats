const axios = require('axios');


exports.index = (req, res, next) => {
    console.log("hi")
    API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjE5OTViMTk4LWU3MTAtNDcwNC1iOThjLTYwZWYzZmIzYWZlZiIsImlhdCI6MTY4NDI3NzU2MSwic3ViIjoiZGV2ZWxvcGVyLzhkNzZlM2FhLWIwZTYtZTkwMS01NjMyLTJiMjg4YWUyYWNlNCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNzQuMjE2LjI0OC4yMTYiXSwidHlwZSI6ImNsaWVudCJ9XX0.arQBGNxuZuH--jFEJRBFnvntJ6805LDDTGxKhSmmK3XTeTA6zXYU9dG_Gx5S1XEWdBdwHEAWo3ULD7O6IAZgCg'
    url = 'https://api.clashroyale.com/v1/clans/%23Q8URC8J8'

    // import node-fetch
// set url as constant
const URL = 'https://api.clashroyale.com/v1/clans/%23Q8URC8J8';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;


    axios
    .get(URL)
    .then(response => {
        console.log(response);
        res.render('index', { title: response });
        console.log(response);

    })
    .catch(error => {
        console.log(error);
        res.render('index', { title: error });
    });

    // res.render('index', { title: response });
};