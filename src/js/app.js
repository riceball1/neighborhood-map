'use strict';

// Global Variables
var starterLocations = [{
        name: "Inchins Bamboo",
        lat: 37.4024,
        lng: -121.94
    },
    {
        name: "Starbucks @Rio Robles",
        lat: 37.4064,
        lng: -121.9418
    },
    {
        name: "Riverview Park",
        lat: 37.4018026,
        lng: -121.9445455
    },
    {
        name: "Mina's Korean Kitchen",
        lat: 37.4107134,
        lng: -121.94796

    },
    {
        name: "Pokeworks",
        lat: 37.4019867,
        lng: -121.9400927
    }
]

var map
var infowindow
var marker

/* uses knockout.js */
var ViewModel = function() {
    var self = this;

    self.title = ko.observable('Neighborhood Map: North San Jose in California');

    self.searchTerm = ko.observable('');


    self.locationList = ko.observableArray([]);

    starterLocations.map(function(place) {
        self.locationList.push(place);
    })

    self.placeList = ko.computed(function() {
        var filter = self.searchTerm().toLowerCase();
        if (!filter) {
            // self.locationList().forEach(function(locationItem) {
            //     locationItem.visible(true);
            // });
            return self.locationList();
        } else {
            return ko.utils.arrayFilter(self.locationList(), function(locationItem) {
                var string = locationItem.name.toLowerCase()
                var result = string.search(filter) >= 0
                locationItem.visible(result);
                return result;
            })
        }
    }, self)

}


/** Google Maps API **/

/* 
 * Source: https://developers.google.com/maps/documentation/javascript/adding-a-google-map
 */
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
            stylers: [{ color: '#e85113' }],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#efe9e4' }, { lightness: -40 }],
        },
        {
            featureType: 'transit.station',
            stylers: [{ weight: 9 }, { hue: '#e85113' }],
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ lightness: 100 }],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ lightness: -100 }],
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ visibility: 'on' }, { color: '#f0e4d3' }],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{ color: '#efe9e4' }, { lightness: -25 }],
        },
    ]

    // Creates Map
    var map = new google.maps.Map(document.getElementById('map'), {
        // center is North San Jose location
        center: { lat: 37.4029, lng: -121.9437 },
        zoom: 14,
        styles: styles,
    })

    // bounce
    function bounce() {
        toggleBounce(this);
    }

    /* YELP Fusiion API */

    var clientID = 'yXr9jBZ-VMNuGY-eq7cQyA';
    var clientSecret =
        'IIjg6C0quL38dOTVl6NuXYE1ZXTt7SpUS6YyOfZrqcamj3ziiQ8jis1nLKnekHsv';


    // Add markers
    // Source code: https://www.youtube.com/watch?v=Zxf1mnP5zcw
    function addMarker(place) {
        marker = new google.maps.Marker({
            position: { lat: place.lat, lng: place.lng },
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: place.name,
        })

        infowindow = new google.maps.InfoWindow({
            content: place.name,
        })

        marker.addListener('click', function() {
            return infowindow.open(map, marker)
        })
    }

    // create each marker
    starterLocations.forEach(function(location) {
        addMarker(location)
    })
}

/* EXTRA FUNCTIONALITIES */

function toggleBounce(marker) {
    if (marker.getAnimation()) {
        marker.setAnimation(null);
        infowindow.close(map, marker);
    } else {
        clearAllBounceAndInfo();
        marker.setAnimation(google.maps.Animation.BOUNCE);
        asyncContent(marker, marker.title);
    }
}

//clear all animations
function clearAllBounceAndInfo() {
  for (i = 0; i < locations.length; i++) {
    markers[i].setAnimation(null);
    infowindow.close(map, markers[i]);
  }
}

/* CALLBACK after Google Maps API is successful*/
function runApp() {
    // initalize map
    initMap()
    // initialize knock ViewModel
    ko.applyBindings(new ViewModel())
}