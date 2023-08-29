document.addEventListener('DOMContentLoaded', function() {
    var $temp = document.createElement("input");
    var $url = window.location.href;

        document.getElementById("share").addEventListener("click", function() {
        const p = document.getElementById("shared")

        var temp = document.createElement("input");
        var url = window.location.href;

        document.body.appendChild(temp);
        temp.value = url;
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);

        p.textContent = "Link Copied!"
    });
});