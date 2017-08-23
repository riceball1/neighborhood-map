/* uses knockout.js */

/** Issue:

Make sure to get this to in the build folder 
 **/

var ViewModel = function() {
    this.title = ko.observable('Neighborhood Map');
}

ko.applyBindings(new ViewModel());



/** Google Maps API **/

/* 
Source: https://developers.google.com/maps/documentation/javascript/adding-a-google-map
*/
function initMap() {
  
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom: 13
    });
    var uluru = { lat: 40.719526, lng: -74.0089934 };
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'First Marker!'
    });

    var infowindow = new google.maps.InfoWindow({
        content: 'This is an example of an InfoWindow'
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}