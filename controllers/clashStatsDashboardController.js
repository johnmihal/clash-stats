const axios = require('axios');
const url = require('url');

const Dashboard = require("../models/dashboard");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const dataProcessors = require("./dataProcessors.js");
const dataSorters = require("./dataSorter.js");
const { response } = require('../app.js');
const secrets = require('../secrets.js');
const { exit } = require('process');
API_KEY = secrets.clash_api_key;
// API_KEY = process.env.clash_api_key;

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
        res.render('dashboard', { 
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
    res.render("create", {
        title: "",
        tag1: "",
        otherTags: [],
        errors: [],
        });
});

exports.create_post = [
    //need more validation and parsing but for now leave as is and we will add functionality later

    body("title")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Title must be specified."),
    body("players")
        .trim()
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        let custom_errors = [];

        console.log(errors);

        console.log(req.body.title);
        console.log(req.body.players);

        let temp_p = [];
        let temp_p_for_errors = [];


        if (Array.isArray(req.body.players)){
            
            for (player of req.body.players){
                console.log("player");
                console.log(player);
                if (player != ''){
                    temp_p_for_errors.push(player);
                    temp_p.push(player.replace(/#/g, function (x) {
                        return '%23';
                    }));
                }
            }
        }else{
            if (req.body.players != ''){
                temp_p_for_errors.push(req.body.players);
                temp_p.push(req.body.players.replace(/#/g, function (x) {
                    return '%23';
                }));
            }
        }

        if (temp_p.length < 1){
            custom_errors.push({mg: "Dashboard must have atleast on player"});
        }


        for (i in temp_p){
            await axios.get('https://api.clashroyale.com/v1/players/' + temp_p[i])
            .then(response => {
                console.log('1')
                console.log(response.data)
            }).then(data => {
                console.log('2')
                console.log(data)
             })
             .catch(error => {
                console.log('3')
                custom_errors.push({msg: temp_p_for_errors[i] + " is an invalid player tag."})
             });
        }

        


            // Create Author object with escaped and trimmed data
        const dashboard = new Dashboard({
            title: req.body.title,
            players: temp_p
        });

        console.log(errors);
    
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render("create", {
            title: req.body.title,
            tag1: temp_p_for_errors[0],
            otherTags: temp_p_for_errors.slice(1),
            errors: errors.array(),
            });
            return;
        }else if (custom_errors.length!=0) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render("create", {
            title: req.body.title,
            tag1: temp_p_for_errors[0],
            otherTags: temp_p_for_errors.slice(1),
            custom_errors: custom_errors,
            });
            return;
        }else {
            // Data from form is valid.
    
            // Save author.
            await dashboard.save();
            // Redirect to new author record.
            res.redirect(dashboard.url);
        }
    }),
];