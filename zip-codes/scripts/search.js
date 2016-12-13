'use strict';
var currState;
var starterLat = 47.611435; //sets initial center of map on page load
var starterLong = -122.330456;
var starterMap = {lat: starterLat, lng: starterLong};
(function(module) {
  webDB.execute(
    'SELECT DISTINCT state FROM zips ' +
    'ORDER BY state DESC;',
    function(rows){
      console.log(rows);
      if (rows.length){
        rows.forEach(function(a){
          $('#state-select').append('<option>' + a.state + '</option>');
        });
      }
      initMap(starterMap);
      $('#state-select').on('change', function() {
        currState = $(this).val();
        $('#city-select').empty();
        if ($(this).val()) {
          webDB.execute(
            'SELECT DISTINCT city FROM zips WHERE state="' + $(this).val() + '"' +
            ' ORDER BY city DESC;',
            function(rows){
              if (rows.length){
                rows.forEach(function(a){
                  $('#city-select').append('<option>' + a.city + '</option>');

                });
              }
            }
          );
        }
      });
      $('#city-select').on('change', function() {
        webDB.execute(
          'SELECT state, latitude, longitude FROM zips WHERE city="' + $(this).val() + '";',
          function(rows) {
            if (rows.length){
              rows.forEach(function(a){
                if (a.state === currState) {
                  var newMap = {lat: 0, lng: 0};
                  newMap = {lat: a.latitude, lng: a.longitude};
                  console.log(newMap, 'this is our new map object');
                  initMap(newMap);
                }
              });
            }
          });
      });
    }
  );
    // TODO: Write the code to populate your filters, and enable the search queries here in search.js
    // TODO: You will also interact with the map.js file here
    // map = new google.maps.Map(document.getElementById("map"), {...});



    // Wire up the zip code search to pull data from the DB and log matching objects to the console (while debugging).
    //   - You will need to write your SQL queries for a direct search of the db using the zip.
    //   - You have the `webDB.execute()` method from the blog available to you for accessing the DB table for this assignment.
})(window);
