'use strict';

(function(module) {

  var searchView = {};

  // TODO: Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: You will also interact with the map.js file here
  searchView.populateFilters = function() {
    webDB.execute('SELECT state FROM zips GROUP BY state;',
    function(rows) {
      if (rows.length) {
        rows.forEach(function(a) {
          $('#state-select').append('<option>' + a.state + '</option>');
        });
      }
    });
  };

  searchView.populateFilters();
})(window);
