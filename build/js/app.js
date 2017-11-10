// Global Variables

var starterLocations = [];
var map;
var infowindow;
var markers = [];
var content = '';
var lat = 37.4029;
var lng = -121.9437;
var map;
var tempArr;

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
    map = new google.maps.Map(document.getElementById('map'), {
        // center is North San Jose location
        center: { lat: lat, lng: lng },
        zoom: 13,
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
                // limit to 10 venues
                starterLocations = response.response.venues.slice(-10);
                if (starterLocations.length > 0) {
                    // create each marker
                    starterLocations.forEach(function(location) {
                        markers.push(addMarker(location))
                    })
                }
                // start up ko viewmodel
                var vm = new ViewModel();
                ko.applyBindings(vm);
                return response;
            })
            .fail(function(response) {
                handleErrors();
                return response;
            })
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
        });

        var name = place.name;
        var formattedAddress = place.location.formattedAddress;
        var fullAddress = formattedAddress[0] + ' <br/> ' + formattedAddress[1] + '  <br/> ' + formattedAddress[2];


        marker.addListener('click', function() {
            // set content
            infowindow.setContent('<h1> ' + name + ' </h1>' + '<p>' + fullAddress + '</p>');
            // open marker with content
            infowindow.open(map, marker);
        });

        return marker;
    }


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

                // restore all markers
                markers.forEach(function(marker) {
                    return marker.setMap(map);
                })

                // reset the entire placeList
                return self.locationList();
            } else {
                tempArr = ko.utils.arrayFilter(self.locationList(), function(location) {
                    var term = location.name.toLowerCase();
                    var result = term.search(filter) >= 0;
                    return result;
                });

                setNewMarkers(tempArr);
                return tempArr;
            }
        }, self);
    };
    // setup venues for map
    getVenues();

    function setNewMarkers(markersArr) {
        // filter the markers 
        var filteredArr = markers.filter(function(marker) {
            for(var i = 0; i < tempArr.length; i++) {
                return tempArr[i].name === marker.title;
            }
        })
        // clear all markers first
        markers.forEach(function(marker) {
            return marker.setMap(null);
        })
        // recreate new markers from filtered arr
        return filteredArr.forEach(function(item) {
            return item.setMap(map);
        })
    }
}



function handleErrors() {
    $('.error-msg').css('display', 'block');
}