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
    '%23RPUGJC2V8'
]


// const playerTags = [
//     '%232UVQL0GY'
// ]

const clanTag = '%23Q8URC8J8'
const axios = require('axios');
const apiConnection = require("./apiConnection.js");
const dataProcessors = require("./dataProcessors.js");
const { response } = require('../app.js');
API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImNjODFjZjE2LTc4OGQtNGVkMi04Y2NkLTY1NmQ5NWRiZGZlNiIsImlhdCI6MTY4NDg4Njc5Niwic3ViIjoiZGV2ZWxvcGVyLzhkNzZlM2FhLWIwZTYtZTkwMS01NjMyLTJiMjg4YWUyYWNlNCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyMDcuMzguMTM1LjEyNCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.GAT9mACSHQdkj9q6ruaR3zt651q1Iy8LxPx_FiJS4g_9FKuiYCMnBcQgR74b8mUaZp-XzR5rVmlbPs2EizhHQQ'
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

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
        ]).
        then(axios.spread((pi1,bl1,pi2,bl2,pi3,bl3,pi4,bl4,pi5,bl5,pi6,bl6,pi7,bl7,pi8,bl8,pi9,bl9,pi10,bl10) => {
            
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

            for (player in playerTags){

                playerInfo = Info[player];
                playerBattleLog = battleLog[player];

                // console.log(playerBattleLog);

                let streak = dataProcessors.get_streak(playerBattleLog)

                x = {};
        
                x.name =  dataProcessors.get_player_name(playerInfo);

                console.log(x.name)
                x.trophies = dataProcessors.get_trophies(playerInfo);
                x.winrate = dataProcessors.get_win_rate(playerInfo);
                x.ten_game_wr = dataProcessors.get_10_game_win_rate(playerBattleLog);
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


            // console.log(data)

            res.render('index', { player_data_list: data });
      
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