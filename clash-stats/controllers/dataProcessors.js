

function get_trophies(playerData){
    return playerData["trophies"];
};

function get_player_name(playerData){
    return playerData["name"];
};

function get_win_rate(playerData){
    return Math.trunc((playerData["wins"]/playerData["battleCount"])*100);
};

function get_10_game_win_rate(playerBattleLog){
    wins = 0
    for (i = 0; i< 10; i++){
        if (playerBattleLog[i]["gameMode"]["name"] === "ladder"){
            if (playerBattleLog[i]["team"][0]["trophyChange"] > 0)
            wins++;
        }else{
            i--;
        }
    }
    return Math.trunc((wins/10)*100)
}

function get_10_game_trophies(playerBattleLog){
    trophies = 0
    for (i = 0; i< 10; i++){
        if (playerBattleLog[i]["gameMode"]["name"] === "ladder"){
            trophies += playerBattleLog[i]["team"][0]["trophyChange"] 
        }else{
            i--;
        }
    }
    return trophies
}

function get_10_game_elixir_leak(playerBattleLog){
    elixirLeak = 0;
    for (i = 0; i< 10; i++){
        if (playerBattleLog[i]["gameMode"]["name"] === "ladder"){
            elixirLeak += playerBattleLog[i]["team"][0]["elixirLeaked"] 
        }else{
            i--;
        }
    }
    return elixirLeak/10
}

function get_10_game_comparitive_elixir_leak(playerBattleLog){
    playerElixirLeak = 0;
    oppononetElixirLeak = 0
    for (i = 0; i< 10; i++){
        if (playerBattleLog[i]["gameMode"]["name"] === "ladder"){
            playerElixirLeak += playerBattleLog[i]["team"][0]["elixirLeaked"]
            oppononetElixirLeak += playerBattleLog[i]["opponent"][0]["elixirLeaked"]
        }else{
            i--;
        }
    }
    return (playerElixirLeak/10)-(oppononetElixirLeak/10)
}

function get_50_game_win_rate(playerBattleLog){

}

function get_50_game_trophies(playerBattleLog){

}

function get_50_game_elixir_leak(playerBattleLog){
    
}

function get_50_game_comparitive_elixir_leak(playerBattleLog){
    
}

function is_streak(playerBattleLog){
    streakLength = 0
    isStreak = true
    streakType = none
    while (isStreak){
        if (playerBattleLog[i]["gameMode"]["name"] === "ladder"){
            trophies = playerBattleLog[i]["team"][0]["trophyChange"];
            if (trophies > 0){
                temp_streakType = "win";
            }else if (trophies < 0){
                temp_streakType = "lose";
            }else{
                temp_streakType = "draw";
            }

            if (streakType === none){
                streakType = temp_streakType;
                streakLength++;
            }else{
                if (streakType === temp_streakType){
                    streakLength++;
                }else{
                    isStreak = false;
                }
            }   
        }
    }
    return [streakType, streakLength]
}

function get_streak(playerBattleLog){
    streakLength = 0
    isStreak = true
    streakType = none
    while (isStreak){
        if (playerBattleLog[i]["gameMode"]["name"] === "ladder"){
            trophies = playerBattleLog[i]["team"][0]["trophyChange"];
            if (trophies > 0){
                temp_streakType = "win";
            }else if (trophies < 0){
                temp_streakType = "lose";
            }else{
                temp_streakType = "draw";
            }

            if (streakType === none){
                streakType = temp_streakType;
                streakLength++;
            }else{
                if (streakType === temp_streakType){
                    streakLength++;
                }else{
                    isStreak = false;
                }
            }   
        }
    }
    return [streakType, streakLength]
}

function get_streak_trophies(playerBattleLog){
    isStreak = true
    streakType = none
    streakTrophies = 0
    while (isStreak){
        if (playerBattleLog[i]["gameMode"]["name"] === "ladder"){
            trophies = playerBattleLog[i]["team"][0]["trophyChange"];
            if (trophies > 0){
                temp_streakType = "win";
            }else if (trophies < 0){
                temp_streakType = "lose";
            }else{
                temp_streakType = "draw";
            }

            if (streakType === none){
                streakType = temp_streakType;
                streakTrophies += trophies;
            }else{
                if (streakType === temp_streakType){
                    streakTrophies += trophies;
                }else{
                    isStreak = false
                }
            }   
        }
    }
    return streakTrophies
}

function get_streak_game_elixir_leak(playerBattleLog){
    
}

function get_streak_game_comparitive_elixir_leak(playerBattleLog){
    
}

module.exports = { 
    get_trophies,
    get_player_name,
    get_win_rate,
    get_10_game_win_rate,
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