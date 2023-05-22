const playerTags = ['%232UVQL0GY']
const clanTag = '%23Q8URC8J8'
const axios = require('axios');

const apiConnection = require("./apiConnection.js");
const dataProcessors = require("./dataProcessors.js");
const { response } = require('../app.js');
API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijk4ODU3NTdhLTA2OWMtNDZjYi1hNmI4LWRiNWEwNjY0NGI3MiIsImlhdCI6MTY4NDc1NzAwMiwic3ViIjoiZGV2ZWxvcGVyLzhkNzZlM2FhLWIwZTYtZTkwMS01NjMyLTJiMjg4YWUyYWNlNCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNzQuMjE2LjI0NS4yNDIiXSwidHlwZSI6ImNsaWVudCJ9XX0.AOuk68YleJNAUcBp3VbizYV5dwIFg5AHYsVNdv88aSwRS35Kr2OIUenhbX_E6DZqp19_APqmFbPoMCshpUEj2Q'
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

exports.index = (req, res, next) => {
    axios.all([
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[0]),
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[0]+'/battlelog')
    ])
    .then(axios.spread((obj1, obj2) => {
            playerInfo = obj1.data;
            playerBattleLog = obj2.data;
            let streak = dataProcessors.get_streak(playerBattleLog)
            console.log(streak)

            res.render('index', {
                    name: dataProcessors.get_player_name(playerInfo),
                    trophies: dataProcessors.get_trophies(playerInfo),
                    winrate: dataProcessors.get_win_rate(playerInfo),
                    ten_game_wr: dataProcessors.get_10_game_win_rate(playerBattleLog),
                    ten_game_trophies:dataProcessors.get_10_game_trophies(playerBattleLog),
                    ten_game_el: dataProcessors.get_10_game_elixir_leak(playerBattleLog),
                    ten_game_el_comp: dataProcessors.get_10_game_comparitive_elixir_leak(playerBattleLog),
                    streak_type: streak[0],
                    streak_length: streak[1],
                    streak_trophies: dataProcessors.get_streak_trophies(playerBattleLog),
                    streak_el: dataProcessors.get_streak_game_elixir_leak(playerBattleLog),
                    comp_streak_el: dataProcessors.get_streak_game_comparitive_elixir_leak(playerBattleLog)
                });
        }))
        .catch(error => {
            console.log(error);
            res.render('index', { name: error });
        });
};