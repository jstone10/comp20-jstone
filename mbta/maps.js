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
            user_marker.addListener('click', function() {
                var closest = getClosestStation(userPos);
            });

        }, locError(), options);
    } else {
        locError();
    }
}


function getClosesStation(pos) {
    var closest = data[0];
    for (var i = 0; i < data.length; i++) {
        curPos = getCoordinates(i);
        if (distance(curPos, pos) < distance(closest, pos)) {
            closest = data[i];
        }
    }
    return closest;
}

function distance(pos1, pos2) {
    var lat1 = pos1.lat;
    var lon1 = pos1.lng;
    var lat2 = pos2.lat;
    var lon2 = pos2.lng;
    var R = 6371e3; // metres
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2 - lat1).toRadians();
    var Δλ = (lon2 - lon1).toRadians();

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}