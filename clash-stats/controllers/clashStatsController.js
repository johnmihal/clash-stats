const playerTags = ['%232UVQL0GY']
const clanTag = '%23Q8URC8J8'

const apiConnection = require("./apiConnection.js");
const dataProcessors = require("./dataProcessors.js");

exports.index = (req, res, next) => {
    Promise.all([apiConnection.get_player(playerTags[0]),apiConnection.get_player_battle_log(playerTags[0])])
        .then(function (results){
            playerInfo = results[0]
            playerBattleLog = results[1]
            res.render('index', { title: response[0] });
            console.log(response);
        })
        .catch(error => {
            console.log(error);
            res.render('index', { title: error });
        });
};