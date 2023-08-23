document.getElementById("add").addEventListener("click", function() {
    var div = document.createElement("div");
    div.classList.add("mt-1");
    var input = document.createElement("input");
    input.type = "text";
    input.name = "players";
    input.required = false;
    input.placeholder = "Player Tag";
    input.classList.add("form-control");
    const group = document.getElementById("form-group-tags");
    div.appendChild(input);
    group.append(div);
});


