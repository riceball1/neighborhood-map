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
                     // creating markers on each location
                     location.marker = addMarker(location);
                 });
             }
             // start up ko viewmodel
             var vm = new ViewModel();
             ko.applyBindings(vm);
             return response;
         })
         .fail(function(response) {
             handleErrors();
             return response;
         });
 }


 /* Google Maps Animate  Marker
 Source: https://developers.google.com/maps/documentation/javascript/examples/marker-animations */


 function toggleBounce(marker) {
     if (marker.getAnimation() !== null) {
         marker.setAnimation(null);
     } else {
         marker.setAnimation(google.maps.Animation.BOUNCE);
     }
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
     });

     infowindow = new google.maps.InfoWindow({
         content: ''
     });

     // NOTE: add alternative in case data comes back undefined/empty
     var name = place.name || 'no place name';
     var formattedAddress = place.location.formattedAddress;
     var fullAddress = formattedAddress.join(',');


     marker.addListener('click', function() {
         // animation
         toggleBounce(this);
         // set content
         infowindow.setContent('<h1> ' + name + ' </h1>' + '<p>' + fullAddress + '</p>');
         // open marker with content
         infowindow.open(map, marker);
     });

     return marker;
 }