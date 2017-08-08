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
    var uluru = { lat: -25.363, lng: 131.044 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}