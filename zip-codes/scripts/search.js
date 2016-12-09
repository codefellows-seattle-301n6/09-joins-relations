'use strict';

(function(module) {

  var stateFilter = function() {
    webDB.execute(
      'SELECT state FROM zips',
      function(states){
        console.log(states);
        states.forEach(function(ele) {
          if ($('#state-select option[value="' + ele.state + '"]').length === 0) {
            $('#state-select').append('<option value="' + ele.state + '">' + ele.state + '</option>');
          }
        });
      }
    );
  };
  // TODO: Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: You will also interact with the map.js file here

  stateFilter();
})(window);
