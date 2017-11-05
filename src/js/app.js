/* uses knockout.js */
var ViewModel = function() {
    this.title = ko.observable('Neighborhood Map: North San Jose in California');
}

// 
ko.applyBindings(new ViewModel());



/** Google Maps API **/

/* 
Source: https://developers.google.com/maps/documentation/javascript/adding-a-google-map
*/
function initMap() {
    // Create a styles array to use with the map.
    // Code adapted from Udacity videos
    var styles = [{
        featureType: 'water',
        stylers: [
            { color: '#19a0d8' }
        ]
    }, {
        featureType: 'administrative',
        elementType: 'labels.text.stroke',
        stylers: [
            { color: '#ffffff' },
            { weight: 6 }
        ]
    }, {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
            { color: '#e85113' }
        ]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            { color: '#efe9e4' },
            { lightness: -40 }
        ]
    }, {
        featureType: 'transit.station',
        stylers: [
            { weight: 9 },
            { hue: '#e85113' }
        ]
    }, {
        featureType: 'road.highway',
        elementType: 'labels.icon',
        stylers: [
            { visibility: 'off' }
        ]
    }, {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
            { lightness: 100 }
        ]
    }, {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            { lightness: -100 }
        ]
    }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            { visibility: 'on' },
            { color: '#f0e4d3' }
        ]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            { color: '#efe9e4' },
            { lightness: -25 }
        ]
    }];


    // Creates Map
    var map = new google.maps.Map(document.getElementById('map'), {
        // center is North San Jose location
        center: { lat: 37.4029497, lng: -121.945965 },
        zoom: 13,
        styles: styles
    });

    // Setup Markers


    var starterLocations = [

        {
            name: 'Bracher Park',
            lat: 37.370,
            long: -122.002
        },
    ]


    // loop through the startLocations array to create markers
    var infowindow;
    starterLocations.map(function(place, index) {
      infowindow = new google.maps.InfoWindo({
        content: place.name
      });
      place.addListener('click', function() {
        infoWindow.open(map, place);
      })
    })



    // var uluru = { lat: 40.719526, lng: -74.0089934 };
    // let marker = new google.maps.Marker({
    //     position: uluru,
    //     map: map,
    //     title: 'First Marker!'
    // });

    // change the content based on the marker clicked
    // use dynamic variables for 'content'
    // var infowindow = new google.maps.InfoWindow({
    //     content: 'This is an example of an InfoWindow'
    // });
    // marker.addListener('click', function() {
    //     infowindow.open(map, marker);
    // });
}