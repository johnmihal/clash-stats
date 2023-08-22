const axios = require('axios');
const url = require('url');

const Dashboard = require("../models/dashboard");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const dataProcessors = require("./dataProcessors.js");
const dataSorters = require("./dataSorter.js");
const { response } = require('../app.js');
API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImM5MjA3NWIyLWQ0YjItNDE5NS05YjA5LWU2ZThkMzMxYjc5YiIsImlhdCI6MTY5MjY2NjM3MSwic3ViIjoiZGV2ZWxvcGVyLzhkNzZlM2FhLWIwZTYtZTkwMS01NjMyLTJiMjg4YWUyYWNlNCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNjIuMTk3LjE2OC4yMDEiXSwidHlwZSI6ImNsaWVudCJ9XX0.GImKCY19VzDk_vJCSenMH_upy8I1Yn4zKwt1--VYZUFVQnnDr8YKbuB91KqkT9DKYKmY9IW3Rt-GqUzdqLSAgg'
http = require("http");
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;


async function getPlayer(player){
    return axios.get('https://api.clashroyale.com/v1/players/'+player)
  }
  

  async function getBattleLog(player){
    axios.get('https://api.clashroyale.com/v1/players/'+player+'/battlelog')
  }

exports.show_dashboard = asyncHandler(async (req, res, next) => {
    let data = [];

    const [dashboard] = await Promise.all([
        Dashboard.findById(req.params.id).exec()
    ]);

    console.log(dashboard.title);
    console.log(dashboard.players);
    console.log(Array.isArray(dashboard.players));
    console.log(dashboard.players.map(player => {return "hi"+player}));

    return Promise.all(dashboard.players.map(player => {
        const playerPromise = axios.get('https://api.clashroyale.com/v1/players/' + player);
        const battlelogPromise = axios.get('https://api.clashroyale.com/v1/players/' + player + '/battlelog');
        
        return Promise.all([playerPromise, battlelogPromise]);
    })).then((result) => {
        console.log("result");
        console.log(result);

        // console.log(result[0]);
        Info = [];
        battleLog = [];

        for (let i = 0; i < dashboard.players.length; i++){
            Info.push(result[i][0].data);
            battleLog.push(result[i][1].data);
        }
        console.log(Info);
        console.log(battleLog);

        for (let i = 0; i < dashboard.players.length; i++){

            playerInfo = Info[i];
            playerBattleLog = battleLog[i];

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

        finalData = JSON.parse(JSON.stringify(dataSorters.sort_by_trophies(data)));
        console.log(finalData);
        res.render('indexNew', { 
            title : dashboard.title,
            best_streak_name: dataSorters.sort_by_best_steak(data)[0].name,
            best_streak_length: dataSorters.sort_by_best_steak(data)[0.].streak_length,
            best_10g_wr_name: dataSorters.sort_by_10g_wr(data)[0].name,
            best_10g_wr: dataSorters.sort_by_10g_wr(data)[0].ten_game_wr,
            best_20g_wr_name: dataSorters.sort_by_20g_wr(data)[0].name,
            best_20g_wr: dataSorters.sort_by_20g_wr(data)[0].twenty_game_wr,
            player_data_list: finalData
            });

    }).catch((error) => {
        console.log(error)
        res.render('error', {
            error: error,
            message: "Invalid Player Data in dashboard"
        })
    });
});

exports.create_get = asyncHandler(async (req, res, next) => {
    res.render("create");
});

exports.create_post = [
    //need more validation and parsing but for now leave as is and we will add functionality later

    body("title")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("First name must be specified.")
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters."),
    body("players")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

            // Create Author object with escaped and trimmed data
        const dashboard = new Dashboard({
            title: req.body.title,
            players: req.body.players
        });
    
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render("create", {
            errors: errors.array(),
            });
            return;
        } else {
            // Data from form is valid.
    
            // Save author.
            await dashboard.save();
            // Redirect to new author record.
            res.redirect(dashboard.url);
        }
    }),
];