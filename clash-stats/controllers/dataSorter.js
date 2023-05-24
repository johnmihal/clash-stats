
function sort_by_trophies(player_data_list){
    return player_data_list.sort((a, b) => b.trophies - a.trophies);
}

function sort_by_name(player_data_list){
    return player_data_list.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
}

function sort_by_wr(player_data_list){
    return player_data_list.sort((a, b) => b.winrate - a.winrate);
}

function sort_by_10g_wr(player_data_list){
    return player_data_list.sort((a, b) => b.ten_game_wr - a.ten_game_wr);
}

function sort_by_20g_wr(player_data_list){
    return player_data_list.sort((a, b) => b.twenty_game_wr - a.twenty_game_wr);
}

function sort_by_best_steak(player_data_list){
    return player_data_list.sort((a, b) => {
        let asl = a.streak_length;
        let bsl = b.streak_length;

        if (a.streak_type === "lose"){
            asl = asl*(-1)
        }

        if (b.streak_type === "lose"){
            bsl = bsl*(-1)
        }

        return b.streak_length - a.streak_length
    })
}

function sort_by_worst_streak(player_data_list){
    return player_data_list.sort((a, b) => {
        let asl = a.streak_length;
        let bsl = b.streak_length;

        if (a.streak_type === "lose"){
            asl = asl*(-1)
        }

        if (b.streak_type === "lose"){
            bsl = bsl*(-1)
        }

        return a.streak_length - b.streak_length
    })
}

module.exports = { 
    sort_by_trophies,
    sort_by_name,
    sort_by_wr,
    sort_by_10g_wr,
    sort_by_20g_wr,
    sort_by_best_steak,
    sort_by_worst_streak
}