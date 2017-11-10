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

    // Creates Map
    map = new google.maps.Map(document.getElementById('map'), {
        // center is North San Jose location
        center: { lat: lat, lng: lng },
        zoom: 13,
        styles: styles,
    });
    getVenues();

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

    // adds click to each list item:


    self.click = function(location) {
        google.maps.event.trigger(location.marker, 'click');
        // // identifies the particular marker
        // var index = self.locationList.indexOf(location);
        // // bounces the marker
        // toggleBounce(markers[index]);
        // // pans to the marker
        // map.panTo(markers[index].position);
        // // opens info window
        // // open marker with content
        // infowindow.open(map, markers[index]);
    };

    // filters places
    self.placeList = ko.computed(function() {
        var filter = self.searchTerm().toLowerCase();
        tempArr = ko.utils.arrayFilter(self.locationList(), function(location) {
            var term = location.name.toLowerCase();
            var result = term.search(filter) >= 0;
            location.marker.setVisible(result)
            return result;
        });
        return tempArr;

    }, self);
};






function handleErrors() {
    $('.error-msg').css('display', 'block');
}