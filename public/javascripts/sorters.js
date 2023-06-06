document.getElementById("name-sort").addEventListener("click", function() {
    let name_elements = document.getElementsByClassName("name");

    name_elements = Array.prototype.slice.call(name_elements).sort(function(a, b){
        let nameA = a.textContent.toUpperCase(); // ignore upper and lowercase
        let nameB = b.textContent.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
    })

    let card_area = document.getElementById("card_area")

    for (i=0;i<name_elements.length;i++ ){
        card_area.appendChild(name_elements[i].parentElement.parentElement)
    }
});



document.getElementById("trophy-sort").addEventListener("click", function() {
    let t_elements = document.getElementsByClassName("trophy");

    t_elements = Array.prototype.slice.call(t_elements).sort((a, b) => b.dataset.trophies - a.dataset.trophies)

    let card_area = document.getElementById("card_area")

    for (i=0;i<t_elements.length;i++ ){
        card_area.appendChild(t_elements[i].parentElement.parentElement)
    }
 });

document.getElementById("best-streak-sort").addEventListener("click", function() {
    let elements = document.getElementsByClassName("streak");

    elements = Array.prototype.slice.call(elements).sort((a, b) => {
        let asl = a.dataset.streak_length;
        let bsl = b.dataset.streak_length;


        if (a.dataset.streak_type === "lose"){
            asl = asl*(-1)
        }

        if (b.dataset.streak_type === "lose"){
            bsl = bsl*(-1)
        }
        return bsl - asl
    })

    let card_area = document.getElementById("card_area")

    for (i=0;i<elements.length;i++ ){
        card_area.appendChild(elements[i].parentElement.parentElement.parentElement)
    }
});

document.getElementById("worst-streak-sort").addEventListener("click", function() {
    let elements = document.getElementsByClassName("streak");

    elements = Array.prototype.slice.call(elements).sort((a, b) => {
        let asl = a.dataset.streak_length;
        let bsl = b.dataset.streak_length;


        if (a.dataset.streak_type === "lose"){
            asl = asl*(-1)
        }

        if (b.dataset.streak_type === "lose"){
            bsl = bsl*(-1)
        }
        return asl - bsl
    })

    let card_area = document.getElementById("card_area")

    for (i=0;i<elements.length;i++ ){
        card_area.appendChild(elements[i].parentElement.parentElement.parentElement)
    }
});

document.getElementById("10-gwr-sort").addEventListener("click", function() {
    let elements = document.getElementsByClassName("10gwr");
    elements = Array.prototype.slice.call(elements).sort((a, b) => b.dataset.ten_gwr - a.dataset.ten_gwr);

    let card_area = document.getElementById("card_area")

    for (i=0;i<elements.length;i++ ){
        card_area.appendChild(elements[i].parentElement.parentElement.parentElement)
    }
});

document.getElementById("20-gwr-sort").addEventListener("click", function() {
    let elements = document.getElementsByClassName("20gwr");
    
    elements = Array.prototype.slice.call(elements).sort((a, b) => b.dataset.twenty_gwr - a.dataset.twenty_gwr);

    let card_area = document.getElementById("card_area")
    
    for (i=0;i<elements.length;i++ ){
        card_area.appendChild(elements[i].parentElement.parentElement.parentElement)
    }
});