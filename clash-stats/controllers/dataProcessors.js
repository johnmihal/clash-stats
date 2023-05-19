

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

        if(playerBattleLog[i]["gameMode"]["name"].includes("Ladder")){
            if (playerBattleLog[i]["team"][0]["trophyChange"] > 0){
                wins++;
            }
        }else{
            x++;
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
            console.log(trophies);
                
        }else{
            x++;
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
        }
    }
    return elixirLeak/10
}

function get_10_game_comparitive_elixir_leak(playerBattleLog){
    let playerElixirLeak = 0;
    let oppononetElixirLeak = 0
    let x = 10
    for (let i = 0; i < x; i++){

        if(playerBattleLog[i]["gameMode"]["name"].includes("Ladder")){
            playerElixirLeak += playerBattleLog[i]["team"][0]["elixirLeaked"]
            oppononetElixirLeak += playerBattleLog[i]["opponent"][0]["elixirLeaked"]
            console.log(playerElixirLeak)
            console.log(oppononetElixirLeak)
        }else{
            x++;
        }
    }
    return (playerElixirLeak)-(oppononetElixirLeak)
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
        if (playerBattleLog[i]["gameMode"]["name"].includes("Ladder")){
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