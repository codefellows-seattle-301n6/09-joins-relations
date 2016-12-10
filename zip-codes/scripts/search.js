'use strict';

(function(module) {

  var searchView = {};

  // TODO: DONE. Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: DONE. You will also interact with the map.js file here
  searchView.populateState = function() {
    webDB.execute('SELECT state FROM zips GROUP BY state;',
    function(rows) {
      if (rows.length) {
        rows.forEach(function(a) {
          $('#state-select').append('<option>' + a.state + '</option>');
        });
      }
    });
  };

  searchView.populateCity = function(state) {
    $('#state-select').on('change', function() {
      webDB.execute('SELECT DISTINCT city FROM zips WHERE state = "' + $(this).val() + '"',
      function(a) {
        a.forEach(function(ele) {
          $('#city-select').append('<option>' + ele.city + '</option>');
        });
      }
    );
    });
  };

  searchView.zipSearch = function() {
    $('form').submit(function(e) {
      e.preventDefault();
      var input = $('input[name="zip"]').val();
      webDB.execute('SELECT latitude, longitude FROM zips WHERE zip="'+ input +'"',
    function(cord) {
      if (!cord.length) {
        return console.log('Please enter a non-bumfuck zipcode');
      }
      var latitude = cord[0].latitude;
      var longitude = cord[0].longitude;
      var mapObject = {lat: latitude, lng: longitude};
      initMap(mapObject);
    });
    });
  };

  searchView.populateState();
  searchView.populateCity();
  searchView.zipSearch();

})(window);
