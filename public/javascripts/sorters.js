


document.getElementById("name-sort").addEventListener("click", function() {
    let name_elements = document.getElementsByClassName("name");
    console.log(name_elements);
    name_elements = (name_elements)

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

    console.log(name_elements)
    console.log(name_elements[0].parentElement.parentElement)


    let card_area = document.getElementById("card_area")

    for (i=0;i<name_elements.length;i++ ){
        card_area.appendChild(name_elements[i].parentElement.parentElement)
    }
});



document.getElementById("trophy-sort").addEventListener("click", function() {
    alert('Welcome to this AMAZING web page!')
 });

document.getElementById("best-streak-sort").addEventListener("click", function() {
    alert('Welcome to this AMAZING web page!')
});

document.getElementById("worst-streak-sort").addEventListener("click", function() {
    alert('Welcome to this AMAZING web page!')
});

document.getElementById("10-gwr-sort").addEventListener("click", function() {
    alert('Welcome to this AMAZING web page!')
});

document.getElementById("20-gwr-sort").addEventListener("click", function() {
    alert('Welcome to this AMAZING web page!')
});