'use strict';

(function(module) {

  var stateFilter = function() {
    webDB.execute(
      'SELECT state FROM zips',
      function(state){
        console.log(state.state);
        // $('#state-select').append('<option value="' + state + '">' + state + '</option>');
      }
    );
  };
  // TODO: Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: You will also interact with the map.js file here

  stateFilter();
})(window);
