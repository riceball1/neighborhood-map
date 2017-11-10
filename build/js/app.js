function initMap(){function e(e){var t=new google.maps.Marker({position:{lat:e.location.lat,lng:e.location.lng},map:map,draggable:!1,animation:google.maps.Animation.DROP,title:e.name,icon:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"});infowindow=new google.maps.InfoWindow({content:""});var r=e.name,o=e.location.formattedAddress,a=o[0]+" <br/> "+o[1]+"  <br/> "+o[2];return t.addListener("click",function(){infowindow.setContent("<h1> "+r+" </h1><p>"+a+"</p>"),infowindow.open(map,t)}),t}function t(e){var t=markers.filter(function(e){for(var t=0;t<tempArr.length;t++)return tempArr[t].name===e.title});return markers.forEach(function(e){return e.setMap(null)}),t.forEach(function(e){return e.setMap(map)})}var r=[{featureType:"water",stylers:[{color:"#19a0d8"}]},{featureType:"administrative",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"},{weight:6}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#e85113"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#efe9e4"},{lightness:-40}]},{featureType:"transit.station",stylers:[{weight:9},{hue:"#e85113"}]},{featureType:"road.highway",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{lightness:100}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{lightness:-100}]},{featureType:"poi",elementType:"geometry",stylers:[{visibility:"on"},{color:"#f0e4d3"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#efe9e4"},{lightness:-25}]}];map=new google.maps.Map(document.getElementById("map"),{center:{lat:lat,lng:lng},zoom:13,styles:r});var o=function(){var e=this;e.title=ko.observable("Neighborhood Map: North San Jose in California"),e.searchTerm=ko.observable(""),e.locationList=ko.observableArray([]),starterLocations.map(function(t){e.locationList.push(t)}),e.placeList=ko.computed(function(){var r=e.searchTerm().toLowerCase();return r?(tempArr=ko.utils.arrayFilter(e.locationList(),function(e){return e.name.toLowerCase().search(r)>=0}),t(),tempArr):(markers.forEach(function(e){return e.setMap(map)}),e.locationList())},e)};$.ajax({url:"https://api.foursquare.com/v2/venues/search?ll="+lat+","+lng+"&client_id=B343KUQONJOP4GFTIV0G4O3L15JPCIQ4L4FUDNYJMPVI1NTW&client_secret=CLUHDBPHSRGCZDO3XA3X35YWA5XQMQZIKN11JW0QQENYGM54&v=20171108",method:"GET",dataType:"json"}).done(function(t){(starterLocations=t.response.venues.slice(-10)).length>0&&starterLocations.forEach(function(t){markers.push(e(t))});var r=new o;return ko.applyBindings(r),t}).fail(function(e){return handleErrors(),e})}function handleErrors(){$(".error-msg").css("display","block")}var starterLocations=[],map,infowindow,markers=[],content="",lat=37.4029,lng=-121.9437,map,tempArr;