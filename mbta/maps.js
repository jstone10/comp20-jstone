var data = [{ "stop_name": "South Station", "stop_lat": "42.352271", "stop_lon": "-71.05524200000001", "stop_id": "place-sstat" }, { "stop_name": "Andrew", "stop_lat": "42.330154", "stop_lon": "-71.057655", "stop_id": "place-andrw" }, { "stop_name": "Porter Square", "stop_lat": "42.3884", "stop_lon": "-71.11914899999999", "stop_id": "place-portr" }, { "stop_name": "Harvard Square", "stop_lat": "42.373362", "stop_lon": "-71.118956", "stop_id": "place-harsq" }, { "stop_name": "JFK/UMass", "stop_lat": "42.320685", "stop_lon": "-71.052391", "stop_id": "place-jfk" }, { "stop_name": "Savin Hill", "stop_lat": "42.31129", "stop_lon": "-71.053331", "stop_id": "place-shmnl" }, { "stop_name": "Park Street", "stop_lat": "42.35639457", "stop_lon": "-71.0624242", "stop_id": "place-pktrm" }, { "stop_name": "Broadway", "stop_lat": "42.342622", "stop_lon": "-71.056967", "stop_id": "place-brdwy" }, { "stop_name": "North Quincy", "stop_lat": "42.275275", "stop_lon": "-71.029583", "stop_id": "place-nqncy" }, { "stop_name": "Shawmut", "stop_lat": "42.29312583", "stop_lon": "-71.06573796000001", "stop_id": "place-smmnl" }, { "stop_name": "Davis", "stop_lat": "42.39674", "stop_lon": "-71.121815", "stop_id": "place-davis" }, { "stop_name": "Alewife", "stop_lat": "42.395428", "stop_lon": "-71.142483", "stop_id": "place-alfcl" }, { "stop_name": "Kendall/MIT", "stop_lat": "42.36249079", "stop_lon": "-71.08617653", "stop_id": "place-knncl" }, { "stop_name": "Charles/MGH", "stop_lat": "42.361166", "stop_lon": "-71.070628", "stop_id": "place-chmnl" }, { "stop_name": "Downtown Crossing", "stop_lat": "42.355518", "stop_lon": "-71.060225", "stop_id": "place-dwnxg" }, { "stop_name": "Quincy Center", "stop_lat": "42.251809", "stop_lon": "-71.005409", "stop_id": "place-qnctr" }, { "stop_name": "Quincy Adams", "stop_lat": "42.233391", "stop_lon": "-71.007153", "stop_id": "place-qamnl" }, { "stop_name": "Ashmont", "stop_lat": "42.284652", "stop_lon": "-71.06448899999999", "stop_id": "place-asmnl" }, { "stop_name": "Wollaston", "stop_lat": "42.2665139", "stop_lon": "-71.0203369", "stop_id": "place-wlsta" }, { "stop_name": "Fields Corner", "stop_lat": "42.300093", "stop_lon": "-71.061667", "stop_id": "place-fldcr" }, { "stop_name": "Central Square", "stop_lat": "42.365486", "stop_lon": "-71.103802", "stop_id": "place-cntsq" }, { "stop_name": "Braintree", "stop_lat": "42.2079", "stop_lon": "-71.0040", "stop_id": "place-brntn" }];

var path_1 = [getCoordinates(11), getCoordinates(10), getCoordinates(2), getCoordinates(3), getCoordinates(20), getCoordinates(12), getCoordinates(13), getCoordinates(6), getCoordinates(14), getCoordinates(0), getCoordinates(7), getCoordinates(1), getCoordinates(4), getCoordinates(5), getCoordinates(19), getCoordinates(9), getCoordinates(17)];

var path_2 = [getCoordinates(4), getCoordinates(8), getCoordinates(18), getCoordinates(15), getCoordinates(16), getCoordinates(21)];


var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function locError() {
    console.warn('browser does not support geo location');
}


// Initialize and add the map
function initMap() {
    var south_station = getCoordinates(0);

    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 12, center: south_station });

    //set markers
    for (var i = 0; i < data.length; i++) {
        var marker = new google.maps.Marker({
            position: getCoordinates(i),
            map: map,
            label: 'T'
        });
        console.log(getCoordinates(i));
    }

    //display user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            var userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            var user_marker = new google.maps.Marker({ position: userPos, map: map });
            map.setCenter(userPos);
            console.log('success!');
        }, locError(), options);
    } else {
        locError();
    }


    //set path
    var redLine_ashmont = new google.maps.Polyline({
        path: path_1,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });

    var redLine_braintree = new google.maps.Polyline({
        path: path_2,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });
}



function getCoordinates(i) {
    return { lat: parseFloat(data[i].stop_lat), lng: parseFloat(data[i].stop_lon) };
}