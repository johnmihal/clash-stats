const axios = require('axios');



API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjE5OTViMTk4LWU3MTAtNDcwNC1iOThjLTYwZWYzZmIzYWZlZiIsImlhdCI6MTY4NDI3NzU2MSwic3ViIjoiZGV2ZWxvcGVyLzhkNzZlM2FhLWIwZTYtZTkwMS01NjMyLTJiMjg4YWUyYWNlNCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNzQuMjE2LjI0OC4yMTYiXSwidHlwZSI6ImNsaWVudCJ9XX0.arQBGNxuZuH--jFEJRBFnvntJ6805LDDTGxKhSmmK3XTeTA6zXYU9dG_Gx5S1XEWdBdwHEAWo3ULD7O6IAZgCg'
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;



function get_player(playerTag){
    return axios.get('https://api.clashroyale.com/v1/players/'+playerTag)
}

function get_player_battle_log(playerTag){
    return axios.get('https://api.clashroyale.com/v1/players/'+playerTag+'battlelog')
}

module.exports = { 
    get_player,
    get_player_battle_log 
};