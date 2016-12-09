'use strict';

(function(module) {

  var stateFilter = function() {
    webDB.execute(
      'SELECT state FROM zips',
      function(states){
        states.forEach(function(ele) {
          if ($('#state-select option[value="' + ele.state + '"]').length === 0) {
            $('#state-select').append('<option value="' + ele.state + '">' + ele.state + '</option>');
          }//TODO: sort the states alphabetically
        });
      }
    );
  };

  var cityFilter = function() {
    $('#state-select').on('change', function(){
      document.getElementById('city-select').options.length = 1;
      webDB.execute(
        'SELECT city, latitude, longitude FROM zips WHERE state = "' + $(this).val() + '"',
        function(cities){
          cities.forEach(function(ele) {
            if ($('#city-select option[value="' + ele.city + '"]').length === 0) {
              $('#city-select').append('<option value="' + ele.city + '">' + ele.city + '</option>');
            } //TODO: sort the cities alphabetically & use latitude/longitude to place marker on map
          });
        }
      );
    });
  };

  var zipSearch = function() {
    $('form').submit(function(e){
      e.preventDefault();
      var userInput = $('input[name="zip"]').val();
      webDB.execute(
        'SELECT latitude, longitude FROM zips WHERE zip="' + userInput + '"',
        function(coordinates) {
          var latitude = coordinates[0].latitude;
          var longitude = coordinates[0].longitude;
          var location = {
            lat: latitude,
            lng: longitude
          };
          initMap(location);
        }
      );
    });
  };
  // TODO: Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: You will also interact with the map.js file here

  stateFilter();
  cityFilter();
  zipSearch();

})(window);
