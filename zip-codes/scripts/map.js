'use strict';

function initMap(myLatlng) {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.611435, lng: -122.330456},
    scrollwheel: true,
    zoom: 8
  });

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map
  });

  // TODO: Follow the Google Maps API docs to create markers on the map based on the search options on the home page.
}
