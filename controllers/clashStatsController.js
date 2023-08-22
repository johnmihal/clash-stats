// see notes for who is who
const playerTags = [
    '%232UVQL0GY', 
    '%238PGVCYGG',
    '%239829QR20',
    '%238RJRCP2',
    '%23Y2CYR80JJ',
    '%23CY002QGQ9',
    '%23RQURLVJY2',
    '%23J2R2RCJPV',
    '%23RCY9CVQL9',
    '%23RPUGJC2V8',
    '%23PRVPCPP2'
]


// const playerTags = [
//     '%232UVQL0GY'
// ]

const clanTag = '%23Q8URC8J8'
const axios = require('axios');
const url = require('url');

// const apiConnection = require("./apiConnection.js");
const dataProcessors = require("./dataProcessors.js");
const dataSorters = require("./dataSorter.js");
const { response } = require('../app.js');

API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImM5MjA3NWIyLWQ0YjItNDE5NS05YjA5LWU2ZThkMzMxYjc5YiIsImlhdCI6MTY5MjY2NjM3MSwic3ViIjoiZGV2ZWxvcGVyLzhkNzZlM2FhLWIwZTYtZTkwMS01NjMyLTJiMjg4YWUyYWNlNCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNjIuMTk3LjE2OC4yMDEiXSwidHlwZSI6ImNsaWVudCJ9XX0.GImKCY19VzDk_vJCSenMH_upy8I1Yn4zKwt1--VYZUFVQnnDr8YKbuB91KqkT9DKYKmY9IW3Rt-GqUzdqLSAgg'
// API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA5NDg5OTA2LTNkY2YtNDAyMS04MmNiLWU2OTM1NmY2MDVlZCIsImlhdCI6MTY4NjIwMDQwNSwic3ViIjoiZGV2ZWxvcGVyLzhkNzZlM2FhLWIwZTYtZTkwMS01NjMyLTJiMjg4YWUyYWNlNCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyMDcuMzguMTM1LjEyNCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.0ytcfIunG2BM8MErHVOl9KYYbSX89f5Slcvuph6jD-8PIrLNXsySwHcXhkyHkvwb-CkDIS4b5NMvffgjGbUpxA'

http = require("http");



axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;
// axios.defaults.proxy = {
//     protocol: 'http',
//     host: fixieUrl.hostname,
//     port: fixieUrl.port,
//     auth: {username: fixieAuth[0], password: fixieAuth[1]}
//   }

function fullUrl(req) {
    return req.originalUrl
  }

exports.index = (req, res, next) => {
    let data = [];

    axios.all([
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[0]),
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[0]+'/battlelog'),

        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[1]),
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[1]+'/battlelog'),

        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[2]),
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[2]+'/battlelog'),

        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[3]),
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[3]+'/battlelog'),

        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[4]),
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[4]+'/battlelog'),

        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[5]),
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[5]+'/battlelog'),

        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[6]),
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[6]+'/battlelog'),

        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[7]),
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[7]+'/battlelog'),

        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[8]),
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[8]+'/battlelog'),

        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[9]),
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[9]+'/battlelog'),

        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[10]),
        axios.get('https://api.clashroyale.com/v1/players/'+playerTags[10]+'/battlelog'),
    ]).
    then(axios.spread((pi1,bl1,pi2,bl2,pi3,bl3,pi4,bl4,pi5,bl5,pi6,bl6,pi7,bl7,pi8,bl8,pi9,bl9,pi10,bl10,pi11,bl11) => {
        
        Info = [];
        battleLog = [];

        Info.push(pi1.data);
        Info.push(pi2.data);
        Info.push(pi3.data);
        Info.push(pi4.data);
        Info.push(pi5.data);
        Info.push(pi6.data);
        Info.push(pi7.data);
        Info.push(pi8.data);
        Info.push(pi9.data);
        Info.push(pi10.data);
        Info.push(pi11.data);


        battleLog.push(bl1.data);
        battleLog.push(bl2.data);
        battleLog.push(bl3.data);
        battleLog.push(bl4.data);
        battleLog.push(bl5.data);
        battleLog.push(bl6.data);
        battleLog.push(bl7.data);
        battleLog.push(bl8.data);
        battleLog.push(bl9.data);
        battleLog.push(bl10.data);
        battleLog.push(bl11.data);


        for (player in playerTags){

            playerInfo = Info[player];
            playerBattleLog = battleLog[player];

            // console.log(playerBattleLog);

            let streak = dataProcessors.get_streak(playerBattleLog)

            x = {};
    
            x.name =  dataProcessors.get_player_name(playerInfo);

            x.trophies = dataProcessors.get_trophies(playerInfo);
            x.winrate = dataProcessors.get_win_rate(playerInfo);
            x.ten_game_wr = dataProcessors.get_10_game_win_rate(playerBattleLog);
            x.twenty_game_wr = dataProcessors.get_20_game_win_rate(playerBattleLog);
            x.ten_game_trophies = dataProcessors.get_10_game_trophies(playerBattleLog);
            x.ten_game_el = dataProcessors.get_10_game_elixir_leak(playerBattleLog);
            x.ten_game_el_comp = dataProcessors.get_10_game_comparitive_elixir_leak(playerBattleLog);
            x.streak_type = streak[0];
            x.streak_length = streak[1];
            x.streak_trophies = dataProcessors.get_streak_trophies(playerBattleLog);
            x.streak_el = dataProcessors.get_streak_game_elixir_leak(playerBattleLog);
            x.comp_streak_el = dataProcessors.get_streak_game_comparitive_elixir_leak(playerBattleLog);

            data.push(x)
        }

        // search_params = req.query
        // console.log(search_params)
        
        // sort = search_params.sort;
        

        // finalData = []

        // console.log(sort)

        // if (sort==="name"){
        //     finalData = JSON.parse(JSON.stringify(dataSorters.sort_by_name(data)));
        // }else if( sort==="best-streak"){
        //     console.log("here")
        //     finalData = JSON.parse(JSON.stringify(dataSorters.sort_by_best_steak(data)));
        // }else if(sort==="worst-streak"){
        //     finalData = JSON.parse(JSON.stringify(dataSorters.sort_by_worst_streak(data)));
        // }else if(sort==="10gwr"){
        //     finalData = JSON.parse(JSON.stringify(dataSorters.sort_by_10g_wr(data)));
        // }else if(sort==="20gwr"){
        //     finalData = JSON.parse(JSON.stringify(dataSorters.sort_by_20g_wr(data)));
        // }else{
        //     finalData = JSON.parse(JSON.stringify(dataSorters.sort_by_trophies(data)));
        //     sort = "trophies"
        // }

        finalData = JSON.parse(JSON.stringify(dataSorters.sort_by_trophies(data)));


        // console.log(finalData)

        res.render('index', { 
            best_streak_name: dataSorters.sort_by_best_steak(data)[0].name,
            best_streak_length: dataSorters.sort_by_best_steak(data)[0.].streak_length,
            best_10g_wr_name: dataSorters.sort_by_10g_wr(data)[0].name,
            best_10g_wr: dataSorters.sort_by_10g_wr(data)[0].ten_game_wr,
            best_20g_wr_name: dataSorters.sort_by_20g_wr(data)[0].name,
            best_20g_wr: dataSorters.sort_by_20g_wr(data)[0].twenty_game_wr,
            player_data_list: finalData
            });
    
    }))
    .catch(error => {
        console.log(error);
    });
};

    // axios.all([
    //     axios.get('https://api.clashroyale.com/v1/players/'+playerTags[0]),
    //     axios.get('https://api.clashroyale.com/v1/players/'+playerTags[0]+'/battlelog')
    // ])
    // .then(axios.spread((obj1, obj2) => {
    //         playerInfo = obj1.data;
    //         playerBattleLog = obj2.data;
    //         let streak = dataProcessors.get_streak(playerBattleLog)
    //         console.log(streak)

    //         res.render('index', {
    //                 name: dataProcessors.get_player_name(playerInfo),
    //                 trophies: dataProcessors.get_trophies(playerInfo),
    //                 winrate: dataProcessors.get_win_rate(playerInfo),
    //                 ten_game_wr: dataProcessors.get_10_game_win_rate(playerBattleLog),
    //                 ten_game_trophies:dataProcessors.get_10_game_trophies(playerBattleLog),
    //                 ten_game_el: dataProcessors.get_10_game_elixir_leak(playerBattleLog),
    //                 ten_game_el_comp: dataProcessors.get_10_game_comparitive_elixir_leak(playerBattleLog),
    //                 streak_type: streak[0],
    //                 streak_length: streak[1],
    //                 streak_trophies: dataProcessors.get_streak_trophies(playerBattleLog),
    //                 streak_el: dataProcessors.get_streak_game_elixir_leak(playerBattleLog),
    //                 comp_streak_el: dataProcessors.get_streak_game_comparitive_elixir_leak(playerBattleLog)
    //             });
    //     }))
    //     .catch(error => {
    //         console.log(error);
    //         res.render('index', { name: error });
    //     });