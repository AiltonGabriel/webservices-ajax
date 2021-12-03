function getWeather(city) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);

            $("#temp").text(response.main.temp + " ºC");
            $("#temp_min").text(response.main.temp_min + " ºC");
            $("#temp_max").text(response.main.temp_max + " ºC");
            $("#condition-img").html('<img src="http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png"></img>');
            $("#sunrise").text(new Date(response.sys.sunrise * 1000).toLocaleTimeString());
            $("#sunset").text(new Date(response.sys.sunset * 1000).toLocaleTimeString());
            $("#lat").text(response.coord.lat);
            $("#lon").text(response.coord.lon);
            $("#sea_level").text(response.main.sea_level);

            $("#erro").hide();
            $("#result").show();
            initMap(response.coord.lat, response.coord.lon);

        } else if (this.readyState == 4 && this.status == 404) {
            $("#err-msg").text("Cidade não encontrada!");
            $("#err").show();
            $("#result").hide();
        } else if (this.readyState == 4) {
            $("#erro-msg").text("Erro ao buscar dados!");
            $("#erro").show();
            $("#result").hide();
        }

    };
    xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=pt_br&appid=323c712fe8bb40a5a669d8f20a32c13b", true);
    xhttp.send();
}

function initMap(lat = 1, lon = 1) {
    const uluru = { lat: lat, lng: lon };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: uluru,
    });
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}

$(document).ready(function() {
    $("#search").click(function() {
        var cidade = $("#city").val();
        getWeather(cidade);
    });

    $("#city").keypress(function(e) {
        if (e.keyCode == 13) {
            $("#search").click();
        }
    });
});
