define([
  'jquery',
  'underscore',
  'backbone',
  'models/locations/LocationModel'
  ], function($, _, Backbone, LocationModel){
    var LocationsCollection = Backbone.Collection.extend({
      model: LocationModel,
      url:"/locations",

      initialize: function(){

      },
      parse: function(response) {
        console.log('response', response);
        return response.locations;
      }

    });

    return LocationsCollection;
  });
