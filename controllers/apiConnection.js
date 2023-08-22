// THIS IS UNUSED

const axios = require('axios');



API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQxNzhhYzI1LTdlMTItNGI4Yi1hNTExLTY2YzBkZjRkN2RlOCIsImlhdCI6MTY4NDQ5OTA4Mywic3ViIjoiZGV2ZWxvcGVyLzhkNzZlM2FhLWIwZTYtZTkwMS01NjMyLTJiMjg4YWUyYWNlNCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNzQuMjE2LjI0MS41NCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.OlUmk5D_-fjxA9bCy86SSVIqOfI3MP2_DW1U-f5kwCYjjR-r4P75KwnzAtAKQ-md5WooGnCPdnvS0ZswA8vKSg'
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;



function get_player(playerTag){
    return axios.get('https://api.clashroyale.com/v1/players/'+playerTag)
}

function get_player_battle_log(playerTag){
    return axios.get('https://api.clashroyale.com/v1/players/'+playerTag+'/battlelog')['data']
}

module.exports = { 
    get_player,
    get_player_battle_log 
};