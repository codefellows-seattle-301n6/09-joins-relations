'use strict';

function initMap(newMap) {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: newMap,
    scrollwheel: true,
    zoom: 8
  });

  var marker = new google.maps.Marker({
    position: newMap,
    map: map
  });
};

// {lat: 47.611435, lng: -122.330456}
// $('#city-select').on('change', function() {
//   webDB.execute(
//     'SELECT loc FROM zips WHERE loc="' + $(this).val() + '";',
//     function(rows) {
//       if (rows.length){
//         console.log($(this).val(), 'city value');
//         rows.forEach(function(a){
//           newMap = a.loc;
//
//         });
//       }
//     });
// });

  // TODO: Follow the Google Maps API docs to create markers on the map based on the search options on the home page.
