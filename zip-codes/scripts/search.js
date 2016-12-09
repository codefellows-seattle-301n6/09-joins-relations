'use strict';

(function(module) {

  var stateFilter = function() {
    webDB.execute(
      'SELECT state FROM zips',
      function(states){
        states.forEach(function(ele) {
          if ($('#state-select option[value="' + ele.state + '"]').length === 0) {
            $('#state-select').append('<option value="' + ele.state + '">' + ele.state + '</option>');
          }
        });
      }
    );
  };

  var cityFilter = function() {
    $('#state-select').on('change', function(){
      document.getElementById('city-select').options.length = 1;
      // console.log($(this).val());
      webDB.execute(
        'SELECT city FROM zips WHERE state = "' + $(this).val() + '"',
        function(cities){
          cities.forEach(function(ele) {
            if ($('#city-select option[value="' + ele.city + '"]').length === 0) {
              $('#city-select').append('<option value="' + ele.city + '">' + ele.city + '</option>');
            }
          });
        }
      );
    });
  };
  // TODO: Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: You will also interact with the map.js file here

  stateFilter();
  cityFilter();
})(window);
