'use strict';


function initMap(location, contentString) {
  // Create a map object and specify the DOM element for display.

  if (location !== null && contentString !== null) {

    var mapOptions = {
      center: location || {lat: 47.611435, lng: -122.330456},
      scrollwheel: true,
      zoom: 8
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  }

  else if (location !== null && contentString === null) {
    console.log('yo we elsifing');

    var stateMapOptions = {
      center: location || {lat: 47.611435, lng: -122.330456},
      scrollwheel: true,
      zoom: 1
    };

    var map = new google.maps.Map(document.getElementById('map'), stateMapOptions);

  }

  else {
    console.log('yo we elsing');

    var defaultMapOptions = {
      center: location || {lat: 47.611435, lng: -122.330456},
      scrollwheel: true,
      zoom: 8
    };

    var map = new google.maps.Map(document.getElementById('map'), defaultMapOptions);

  }

  // TODO: Follow the Google Maps API docs to create markers on the map based on the search options on the home page.
}
