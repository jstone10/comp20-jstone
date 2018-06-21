// Initialize and add the map
function initMap() {
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 12, center: { lat: 42.3601, lng: -71.0589 } });


    var train_info = new google.maps.InfoWindow();

    //display user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            var user_marker = new google.maps.Marker({ position: userPos, map: map });
            map.setCenter(userPos);
            var closest = getClosestStation(userPos);
        }, locError(), options);
    } else {
        locError();
    }


    function showStationInfo(station) {
        var request = new XMLHttpRequest();
        var trains = "https://defense-in-derpth.herokuapp.com/redline/schedule.json?stop_id=" + station.stop_id;
        request.open("GET", trains, true);
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                var data = request.responseText;
                var station_info = JSON.parse(data);
                var outbound = find_trains(sort_direction(station_info, 1), 1);
                var inbound = find_trains(sort_direction(station_info, 0), 0);

                var content = createContent(outbound, inbound, station);

            } else if (request.readyState == 4 && request.status != 200) {
                train_info.setContent("OOPS! something went terribly wrong :(");
            } else {
                train_info.setContent("loading content...");
            }
        };
    }


    //display station markers
    for (var i = 0; i < data.length; i++) {
        var marker = new google.maps.Marker({
            position: return_coordinates(data[i]),
            map: map,
            label: 'T'
        });
    }

    //draw red line
    var path = get_path(data, 0, data.length - 4);
    var red_line_brntree = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });

    var ash_pth = get_path(data, data.length - 4, data.length);
    var red_line_ash = new google.maps.Polyline({
        path: ash_pth,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });

}

function find_trains(sched, dir) {
    var now = new Date();
    if (dir == 1) {
        var train = [];
        j = 0;
        for (i = 0; i < sched.length; i++) {
            var curTime = new Date(sched[i].arrival_time);
            if (curTime > now) {
                train[j] = sched[i];
                j++;
            }
        }
        return train;
    } else {
        var train0 = [];
        j = 0;
        for (i = 0; i < sched.length; i++) {
            var curTime0 = new Date(sched[i].departure_time);
            if (curTime0 > now && curTime0 < time0) {
                train0[j] = sched[i];
                j++;
            }
        }
        return train0;
    }
}

function sort_direction(sched, direction) {
    var same_direction = [];
    var j = 0;
    for (i = 0; i < sched.length; i++) {
        if (sched[i].attributes.direction_id == direction) {
            same_direction[j] = sched[i].attributes;
            j++;
        }
    }
    return same_direction;
}

function createContent(inbnd, outbnd, stat) {
    var content = "<h1>" + stat.stop_name + "</h1>";
    content += "<h2>Inbound Trains</p>";
    for (i = 0; i < inbnd.length; i++) {

    }
}
var data = [{ "stop_lat": "42.395428", "stop_name": "Alewife", "stop_lon": "-71.142483", "stop_id": "place-alfcl" }, { "stop_lat": "42.39674", "stop_name": "Davis", "stop_lon": "-71.121815", "stop_id": "place-davis" }, { "stop_lat": "42.3884", "stop_name": "Porter Square", "stop_lon": "-71.11914899999999", "stop_id": "place-portr" }, { "stop_lat": "42.373362", "stop_name": "Harvard Square", "stop_lon": "-71.118956", "stop_id": "place-harsq" }, { "stop_lat": "42.365486", "stop_name": "Central Square", "stop_lon": "-71.103802", "stop_id": "place-cntsq" }, { "stop_lat": "42.36249079", "stop_name": "Kendall/MIT", "stop_lon": "-71.08617653", "stop_id": "place-knncl" }, { "stop_lat": "42.361166", "stop_name": "Charles/MGH", "stop_lon": "-71.070628", "stop_id": "place-chmnl" }, { "stop_lat": "42.35639457", "stop_name": " Park Street", "stop_lon": "-71.0624242", "stop_id": "place-pktrm" }, { "stop_lat": "42.355518", "stop_name": "Downtown Crossing", "stop_lon": "-71.060225", "stop_id": "place-dwnxg" }, { "stop_lat": "42.352271", "stop_name": "South Station", "stop_lon": "-71.05524200000001", "stop_id": "place-sstat" }, { "stop_lat": "42.342622", "stop_name": "Broadway", "stop_lon": "-71.056967", "stop_id": "place-brdwy" }, { "stop_lat": "42.330154", "stop_name": "Andrew", "stop_lon": "-71.057655", "stop_id": "place-andrw" }, { "stop_lat": "42.320685", "stop_name": "JFK/UMass", "stop_lon": "-71.052391", "stop_id": "place-jfk" }, { "stop_lat": "42.275275", "stop_name": "North Quincy", "stop_lon": "-71.029583", "stop_id": "place-nqncy" }, { "stop_lat": "42.2665139", "stop_name": "Wollaston", "stop_lon": "-71.0203369", "stop_id": "place-wlsta" }, { "stop_lat": "42.251809", "stop_name": "Quincy Center", "stop_lon": "-71.005409", "stop_id": "place-qnctr" }, { "stop_lat": "42.233391", "stop_name": "Quincy Adams", "stop_lon": "-71.007153", "stop_id": "place-qamnl" }, { "stop_lat": "42.2078543", "stop_name": "Braintree", "stop_lon": "-71.0011385", "stop_id": "place-brntn" }, { "stop_lat": "42.31129", "stop_name": "Savin Hill", "stop_lon": "-71.053331", "stop_id": "place-shmnl" }, { "stop_lat": "42.300093", "stop_name": "Fields Corner", "stop_lon": "-71.061667", "stop_id": "place-fldcr" }, { "stop_lat": "42.29312583", "stop_name": "Shawmut", "stop_lon": "-71.06573796000001", "stop_id": "place-smmnl" }, { "stop_lat": "42.284652", "stop_name": "Ashmont", "stop_lon": "-71.06448899999999", "stop_id": "place-asmnl" }];

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function locError() {
    console.warn('browser does not support geo location');
}

function getClosestStation(uPos) {
    var pos = return_coordinates(data[0]);
    var closest = data[0];
    for (var i = 0; i < data.length; i++) {
        curPos = return_coordinates(data[i]);
        if (distance(curPos, uPos, false) < distance(pos, uPos, false)) {
            pos = curPos;
            closest = data[i];
        }
    }
    return closest;
}

function get_path(arr, start, stop) {
    var path = [];
    j = 0;
    for (var i = start; i < stop; i++) {
        path[j] = return_coordinates(arr[i]);
        j++;
    }
    return path;
}


function return_coordinates(data) {
    return { lat: parseFloat(data.stop_lat), lng: parseFloat(data.stop_lon) };
}

//source: https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
function distance(coords1, coords2, isMiles) {
    function toRad(x) {
        return x * Math.PI / 180;
    }
    var lon1 = coords1.lng;
    var lat1 = coords1.lat;

    var lon2 = coords2.lng;
    var lat2 = coords2.lat;

    var R = 6371; // km

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    if (isMiles) d /= 1.60934;
    return d;
}