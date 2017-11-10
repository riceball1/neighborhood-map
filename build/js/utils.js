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
    // close all animations 
    // turnMarkersOffop;   (markers);
     if (marker.getAnimation() !== null) {
         marker.setAnimation(null);
     } else {
         marker.setAnimation(google.maps.Animation.BOUNCE);
         infowindow.open(map, marker);
     }

     // stop animations after a certain time
     setTimeout(function() {
            marker.setAnimation(null);
            infowindow.close(map, marker);
         }, 3000);
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


/* Source: https://hashnode.com/post/google-maps-api-onclick-on-marker-close-infowindow-of-other-markers-ciou68dw708x33353les71nyi */

//  function turnMakersOff(markers) {
//    markers.forEach(function(marker) {
//     // stop animations
//     marker.setAnimation(null);

//     // close info window
//     infowindow.close(map, marker);
//   }); 
// }