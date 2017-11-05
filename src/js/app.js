 var starterLocations = [

     {
         name: 'Inchins Bamboo',
         lat: 37.4023362,
         long: -122.0100468
     },
     {
         name: 'Starbucks @Rio Robles'
     },
     {
         name: 'Honeyberry'
     },
     {
         name: 'Mina Korean Kitchen'
     },
     {
         name: 'Pokeworks'
     }
 ]



 /* uses knockout.js */
 var ViewModel = function() {
     var self = this;

     this.title = ko.observable('Neighborhood Map: North San Jose in California');

     this.searchTerm = ko.observable("");

     this.locationList = ko.observableArray([]);

     starterLocations.map(function(place) {
         self.locationList.push(place);
     });

     this.placeList = ko.computed(function() {
         var filter = self.searchTerm().toLowerCase();
         if (!filter) {
             // self.locationList().forEach(function(locationItem) {
             //     locationItem.visible(true);
             // });
             return self.locationList();
         } else {
             return ko.utils.arrayFilter(self.locationList(), function(locationItem) {
                 var string = locationItem.name.toLowerCase();
                 var result = (string.search(filter) >= 0);
                 locationItem.visible(result);
                 return result;
             });
         }
     }, self);

     initMap();
 }




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

 }


 // callback after google maps is successful
 function runApp() {
     ko.applyBindings(new ViewModel());
 }