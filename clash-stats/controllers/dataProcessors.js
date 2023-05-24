

function get_trophies(playerData){
    return playerData["trophies"];
};

function get_player_name(playerData){
    return playerData.name;
};

function get_win_rate(playerData){
    return Math.trunc((playerData["wins"]/(playerData["losses"]+playerData["wins"])*100));
};

function get_10_game_win_rate(playerBattleLog){
    let wins = 0
    let x = 10
    for (let i = 0; i < x; i++){
        p_crowns = playerBattleLog[i]["team"][0]["crowns"];
        o_crowns = playerBattleLog[i]["opponent"][0]["crowns"];

        if (p_crowns > o_crowns){
            wins++;
        }
        
    }
    return Math.trunc((wins/x)*100)
}

function get_20_game_win_rate(playerBattleLog){
    let wins = 0
    let x = 20
    for (let i = 0; i < x; i++){
        p_crowns = playerBattleLog[i]["team"][0]["crowns"];
        o_crowns = playerBattleLog[i]["opponent"][0]["crowns"];

        if (p_crowns > o_crowns){
            wins++;
        }
        
    }
    return Math.trunc((wins/x)*100)
}

function get_10_game_trophies(playerBattleLog){
    let trophies = 0
    let x = 10
    for (let i = 0; i < x; i++){

        if(playerBattleLog[i]["gameMode"]["name"].includes("Ladder")){
            trophies += playerBattleLog[i]["team"][0]["trophyChange"];                
        }else{
            x++;
            if (x >playerBattleLog.length){
                i = x + 1;
            }
        }
    }
    return trophies
}

function get_10_game_elixir_leak(playerBattleLog){
    let elixirLeak = 0;
    let x = 10
    for (let i = 0; i < x; i++){

        if(playerBattleLog[i]["gameMode"]["name"].includes("Ladder")){
            elixirLeak += playerBattleLog[i]["team"][0]["elixirLeaked"];   
        }else{
            x++;
            if (x >playerBattleLog.length){
                i = x + 1;
            }
        }
    }
    return Math.trunc(elixirLeak/10)
}

function get_10_game_comparitive_elixir_leak(playerBattleLog){
    let playerElixirLeak = 0;
    let oppononetElixirLeak = 0
    let x = 10
    for (let i = 0; i < x; i++){

        if(playerBattleLog[i]["gameMode"]["name"].includes("Ladder")){
            playerElixirLeak += playerBattleLog[i]["team"][0]["elixirLeaked"]
            oppononetElixirLeak += playerBattleLog[i]["opponent"][0]["elixirLeaked"]
        }else{
            x++;
            if (x >playerBattleLog.length){
                i = x + 1;
            }
        }
    }
    return Math.trunc((playerElixirLeak)-(oppononetElixirLeak))
}

function get_50_game_win_rate(playerBattleLog){

}

function get_50_game_trophies(playerBattleLog){

}

function get_50_game_elixir_leak(playerBattleLog){
    
}

function get_50_game_comparitive_elixir_leak(playerBattleLog){
    
}

function get_streak(playerBattleLog){
    let streakLength = 0;
    let isStreak = true;
    let streakType = null;
    let temp_streakType = "";

    for(let i = 0; i < playerBattleLog.length; i++){
        p_crowns = playerBattleLog[i]["team"][0]["crowns"];
        o_crowns = playerBattleLog[i]["opponent"][0]["crowns"];

        if (p_crowns > o_crowns){
            temp_streakType = "win";
        }else if (p_crowns < o_crowns){
            temp_streakType = "lose";
        }else{
            temp_streakType = "draw";
        }

        if (streakType === null){
            streakType = temp_streakType;
            streakLength++;
        }else{
            if (streakType === temp_streakType){
                streakLength++;
            }else{
                isStreak = false;
            }
        }
        
        if (isStreak === false){
            i = playerBattleLog.length
        }
    }
    return [streakType, streakLength]
}

function get_streak_trophies(playerBattleLog){
    let streak_trophies = 0;
    let isStreak = true;
    let streakType = null;
    let temp_streakType = "";
    let temp_trophies = 0;
    let trophies = 0;

    for(let i = 0; i < playerBattleLog.length; i++){
        if (playerBattleLog[i]["gameMode"]["name"].includes("Ladder")){
            temp_trophies = playerBattleLog[i]["team"][0]["trophyChange"];
            if (temp_trophies > 0){
                temp_streakType = "win";
            }else if (temp_trophies < 0){
                temp_streakType = "lose";
            }else{
                temp_streakType = "draw";
            }

            if (streakType === null){
                streakType = temp_streakType;
                streak_trophies += trophies;
            }else{
                if (streakType === temp_streakType){
                    streak_trophies += trophies;
                }else{
                    isStreak = false;
                }
            }   
        }

        if (isStreak === false){
            i = playerBattleLog.length
        }
    }

    return streak_trophies
}

function get_streak_game_elixir_leak(playerBattleLog){
    let streak_el = 0;
    let streak_len = 0;
    let isStreak = true;
    let streakType = null;
    let temp_streakType = "";
    let temp_trophies = 0;

    for(let i = 0; i < playerBattleLog.length; i++){
        if (playerBattleLog[i]["gameMode"]["name"].includes("Ladder")){
            temp_trophies = playerBattleLog[i]["team"][0]["trophyChange"];
            if (temp_trophies > 0){
                temp_streakType = "win";
            }else if (temp_trophies < 0){
                temp_streakType = "lose";
            }else{
                temp_streakType = "draw";
            }

            if (streakType === null){
                streakType = temp_streakType;
                streak_len++;
                streak_el += playerBattleLog[i]["team"][0]["elixirLeaked"]

            }else{
                if (streakType === temp_streakType){
                    streak_len++;
                    streak_el += playerBattleLog[i]["team"][0]["elixirLeaked"]
                }else{
                    isStreak = false;
                }
            }   
        }

        if (isStreak === false){
            i = playerBattleLog.length
        }
    }

    return Math.trunc(streak_el/streak_len)
}

function get_streak_game_comparitive_elixir_leak(playerBattleLog){
    let player_el = 0;
    let opponent_el = 0;
    let isStreak = true;
    let streakType = null;
    let temp_streakType = "";
    let temp_trophies = 0;

    for(let i = 0; i < playerBattleLog.length; i++){
        if (playerBattleLog[i]["gameMode"]["name"].includes("Ladder")){
            temp_trophies = playerBattleLog[i]["team"][0]["trophyChange"];
            if (temp_trophies > 0){
                temp_streakType = "win";
            }else if (temp_trophies < 0){
                temp_streakType = "lose";
            }else{
                temp_streakType = "draw";
            }

            if (streakType === null){
                streakType = temp_streakType;
                player_el += playerBattleLog[i]["team"][0]["elixirLeaked"]
                opponent_el += playerBattleLog[i]["opponent"][0]["elixirLeaked"]


            }else{
                if (streakType === temp_streakType){
                    player_el += playerBattleLog[i]["team"][0]["elixirLeaked"]
                    opponent_el += playerBattleLog[i]["opponent"][0]["elixirLeaked"]
                }else{
                    isStreak = false;
                }
            }   
        }

        if (isStreak === false){
            i = playerBattleLog.length
        }
    }

    return Math.trunc(player_el-opponent_el)
}

module.exports = { 
    get_trophies,
    get_player_name,
    get_win_rate,
    get_10_game_win_rate,
    get_20_game_win_rate,
    get_10_game_trophies,
    get_10_game_elixir_leak,
    get_10_game_comparitive_elixir_leak,
    get_50_game_trophies,
    get_50_game_win_rate,
    get_50_game_elixir_leak,
    get_50_game_comparitive_elixir_leak,
    get_streak,
    get_streak_trophies,
    get_streak_game_elixir_leak,
    get_streak_game_comparitive_elixir_leak
};