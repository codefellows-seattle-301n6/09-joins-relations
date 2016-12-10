'use strict';


function initMap(location) {
  // Create a map object and specify the DOM element for display.
  var mapOptions = {
    center: location || {lat: 47.611435, lng: -122.330456},
    scrollwheel: true,
    zoom: 8
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  // var infoWindow = new google.maps.infoWindow(

  // )
  // TODO: Follow the Google Maps API docs to create markers on the map based on the search options on the home page.

}
