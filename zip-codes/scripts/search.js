'use strict';

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
      $('#state-select').on('change', function() {
        var latitude = 19.8968;
        var longitude = 155.5828;
        var newMap = {lat: latitude, lng: longitude};
        initMap(newMap);

        $('#city-select').empty();
        console.log($(this).val(), 'state value');
        console.log($(this).val());
        if ($(this).val()) {
          webDB.execute(
            'SELECT DISTINCT city FROM zips WHERE state="' + $(this).val() + '"' +
            ' ORDER BY city DESC;',
            function(rows){
              if (rows.length){
                console.log($(this).val(), 'state value');
                rows.forEach(function(a){
                  $('#city-select').append('<option>' + a.city + '</option>');

                });
              }
            }
          );
        }
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
