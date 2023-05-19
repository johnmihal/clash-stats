const playerTags = ['%232UVQL0GY']
const clanTag = '%23Q8URC8J8'
const axios = require('axios');

const apiConnection = require("./apiConnection.js");
const dataProcessors = require("./dataProcessors.js");
const { response } = require('../app.js');
API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImFmNjFlNDcxLTRmNTQtNGY5Yi1hMTQ3LWY5NzNkZWNiN2U2OCIsImlhdCI6MTY4NDUzMzQ2OSwic3ViIjoiZGV2ZWxvcGVyLzhkNzZlM2FhLWIwZTYtZTkwMS01NjMyLTJiMjg4YWUyYWNlNCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI3MS4yNDkuMTE2LjEwMiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.YvpD0gPAbLsS33RAvHsygaYBQg8vdkKBVYY_2XiCn_THmk7cruYcTAo1Ujro3XIFiW2C4XFFWOa67_U5zqlptg'
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

exports.index = (req, res, next) => {
    // axios.get('https://api.clashroyale.com/v1/players/'+playerTags[0])
    //   .then(function(response) {
    //      playerInfo = response.data
    //      res.render('index', {
    //         name: dataProcessors.get_player_name(playerInfo),
    //         trophies: dataProcessors.get_trophies(playerInfo),
    //         winrate: dataProcessors.get_win_rate(playerInfo)

    //      })
    //   }).catch(function(error) {
    //         console.log(error);
    //         res.render('index', { name: error });
    //   });



    axios.all([
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[0]),
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[0]+'/battlelog')
    ])
    .then(axios.spread((obj1, obj2) => {
            playerInfo = obj1.data;
            playerBattleLog = obj2.data;

            res.render('index', {
                    name: dataProcessors.get_player_name(playerInfo),
                    trophies: dataProcessors.get_trophies(playerInfo),
                    winrate: dataProcessors.get_win_rate(playerInfo),
                    ten_game_wr: dataProcessors.get_10_game_win_rate(playerBattleLog),
                    ten_game_trophies:dataProcessors.get_10_game_trophies(playerBattleLog),
                    ten_game_el: dataProcessors.get_10_game_elixir_leak(playerBattleLog),
                    ten_game_el_comp: dataProcessors.get_10_game_comparitive_elixir_leak(playerBattleLog)
                    // streak_type: dataProcessors.get_streak(playerBattleLog),
                    // streak_trophies: dataProcessors.get_streak_trophies(playerBattleLog)
                });
        }))
        .catch(error => {
            console.log(error);
            res.render('index', { name: error });
        });
};