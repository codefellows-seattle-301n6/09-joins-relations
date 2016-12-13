'use strict';

(function(module) {

  var placeHolder = function() {
    $('input[placeholder]').each(function () {
      $(this).attr('size', $(this).attr('placeholder').length);
    });
  };

  var stateFilter = function() {
    webDB.execute(
      'SELECT DISTINCT state ' +
      'FROM zips ' +
      'ORDER BY state ASC',
      function(states) {
        states.forEach(function(ele) {
          $('#state-select').append('<option value="' + ele.state + '">' + ele.state + '</option>');
        });
      }
    );
  };

  var cityFilter = function() {
    $('#state-select').on('change', function(){
      document.getElementById('city-select').options.length = 1;
      $('#city-select option').empty();
      webDB.execute(
        'SELECT DISTINCT city, latitude, longitude ' +
        'FROM zips ' +
        'WHERE state = "' + $(this).val() + '" ORDER BY city ASC',
        function(cities) {
          cities.forEach(function(ele) {
            if($('#city-select option[value="' + ele.city + '"]').length === 0) {
              $('#city-select').append('<option value="' + ele.city + '">' + ele.city + '</option>');
            }
          });
          var stateLocation = {
            lat: cities[0].latitude,
            lng: cities[0].longitude
          };
          initMap(stateLocation);
        }
      );
    });
  };

  var citySearch = function() {
    $('#city-select').on('change', function() {
      webDB.execute(
        'SELECT latitude, longitude, city, state, zip, population ' +
        'FROM zips ' +
        'WHERE state="' + $('#state-select').val() + '" AND ' +
        'city="' + $(this).val() + '"',
        function(coordinates) {
          var latitude = coordinates[0].latitude;
          var longitude = coordinates[0].longitude;
          var location = {
            lat: latitude,
            lng: longitude
          };
          var city = coordinates[0].city;
          var state = coordinates[0].state;
          var zips = function() {
            return coordinates.map(function(zippy) {
              return zippy.zip;
            }).join(', ');
          };
          var pop = function() {
            return coordinates.map(function(city) {
              return city.population;
            }).reduce(function(total, current) {
              return total += current;
            });
          };
          var contentString = '<div id="info">' + '<h1>' + city + ', ' + state + '</h1><h5><strong>Includes zips: </strong>' + zips() + '</h5><h3>Population: ' + pop() + '</h3></div>';
          initMap(location, contentString);
        }//TODO: Refactor to put a marker at each zip code for given city
      );
    });
  };

  var zipSearch = function() {
    $('form').submit(function(e) {
      e.preventDefault();
      var userInput = $('input[name="zip"]').val();
      if(userInput.length === 5 && /^[0-9]+$/.test(userInput)) {
        webDB.execute(
          'SELECT latitude, longitude, city, state, population ' +
          'FROM zips ' +
          'WHERE zip="' + userInput + '"',
          function(coordinates) {
            var latitude = coordinates[0].latitude;
            var longitude = coordinates[0].longitude;
            var location = {
              lat: latitude,
              lng: longitude
            };
            var city = coordinates[0].city;
            var state = coordinates[0].state;
            var pop = coordinates[0].population;
            var contentString = '<div id="info">' + '<h1>' + city + ', ' + state + '</h1><h5>Zip Code: ' + userInput + '</h5><h3>Population: ' + pop + '</h3></div>';
            initMap(location, contentString);
          }
        );
      } else {
        window.location.href = 'error.html';
      }
    });
  };
  // TODO: Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: You will also interact with the map.js file here

  placeHolder();
  stateFilter();
  cityFilter();
  citySearch();
  zipSearch();

})(window);
