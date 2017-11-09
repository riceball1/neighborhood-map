// Global Variables

var starterLocations = [];


// var starterLocations = [{
//         name: "Inchins Bamboo",
//         lat: 37.4024,
//         lng: -121.94,
//         phone: '+14084713322'
//     },
//     {
//         name: "Starbucks @Rio Robles",
//         lat: 37.4064,
//         lng: -121.9418,
//         phone: '+4084359621'
//     },
//     {
//         name: "Halal Gyro Express & Kebabs",
//         lat: 37.4106962,
//         lng: -121.9478167,
//         phone: '+14085260444'
//     },
//     {
//         name: "Mina's Korean Kitchen",
//         lat: 37.4107134,
//         lng: -121.94796,
//         phone: '+14084332270'

//     },
//     {
//         name: "Pokeworks",
//         lat: 37.4019867,
//         lng: -121.9400927,
//         phone: '+14089122306'
//     }
// ];

var map;
var infowindow;
var markers = [];
var content = '';
var lat = 37.4029;
var lng = -121.9437;

/* uses knockout.js */
var ViewModel = function() {
    var self = this;
    self.title = ko.observable('Neighborhood Map: North San Jose in California');
    self.searchTerm = ko.observable('');
    self.locationList = ko.observableArray([]);

    // add locations to ko observableArray
    starterLocations.map(function(place) {
        self.locationList.push(place);
    });

    // filters places
    self.placeList = ko.computed(function() {
        var filter = self.searchTerm().toLowerCase();
        if (!filter) {
            return self.locationList();
        } else {
            return ko.utils.arrayFilter(self.locationList(), function(location) {
                var string = location.name.toLowerCase();
                var result = string.search(filter) >= 0;
                location.visible(result);
                return result;
            });
        }
    }, self);
};


/** Google Maps API **/

/* Source: https://developers.google.com/maps/documentation/javascript/adding-a-google-map*/
function initMap() {
    // Create a styles array to use with the map.
    // Code adapted from Udacity videos
    var styles = [{
            featureType: 'water',
            stylers: [{ color: '#19a0d8' }]
        },
        {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ffffff' }, { weight: 6 }]
        },
        {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#e85113' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#efe9e4' }, { lightness: -40 }]
        },
        {
            featureType: 'transit.station',
            stylers: [{ weight: 9 }, { hue: '#e85113' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ lightness: 100 }]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ lightness: -100 }]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ visibility: 'on' }, { color: '#f0e4d3' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{ color: '#efe9e4' }, { lightness: -25 }]
        }
    ];

    // Creates Map
    var map = new google.maps.Map(document.getElementById('map'), {
        // center is North San Jose location
        center: { lat: lat, lng: lng },
        zoom: 14,
        styles: styles,
    });
    /* FourSquare API */
    function getVenues() {
        var clientID = "B343KUQONJOP4GFTIV0G4O3L15JPCIQ4L4FUDNYJMPVI1NTW";
        var clientSecret =
            "CLUHDBPHSRGCZDO3XA3X35YWA5XQMQZIKN11JW0QQENYGM54";
        // Request access token
        $.ajax({
                url: "https://api.foursquare.com/v2/venues/search?ll=" + lat + ',' + lng + '&client_id=' + clientID + '&client_secret=' + clientSecret + "&v=20171108",
                method: "GET",
                dataType: "json"
            })
            .done(function(response) {

                starterLocations = response.response.venues.slice(-5)
                // initialize knock ViewModel
                if (starterLocations.length > 0) {
                    // create each marker
                    starterLocations.forEach(function(location) {
                        markers.push(addMarker(location))
                    })
                    ko.applyBindings(new ViewModel());
                }
                return response;
            })
            .fail(function(error) {
                // infowindow.setContent('<h1> ' + error.error + ' </h1>');
                return error;
            })
        // get API to get business id
        // use business id to get information
    }

  

    // Add markers
    // Source code: https://www.youtube.com/watch?v=Zxf1mnP5zcw
    function addMarker(place) {

        var marker = new google.maps.Marker({
            position: { lat: place.location.lat, lng: place.location.lng },
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            title: place.name,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        })

        infowindow = new google.maps.InfoWindow({
            content: ''
        })

        marker.addListener('click', function() {
            // set content
              infowindow.setContent('<h1> ' + place.name + ' </h1>' + '<p>' + place.location.formattedAddress + '</p>' + '<p>' + place.contact.formattedPhone + '</p>');
            // open marker with content
            infowindow.open(map, marker);
        });

        return marker;
    }

    // setup venues for map
    getVenues();
}


/* CALLBACK after Google Maps API is successful*/
function runApp() {
    // initalize map
    initMap()

}