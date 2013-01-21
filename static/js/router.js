// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'vent',
  'views/locations/LocationsView',
  'views/locations/locationView',
  'views/home/HomeView'
  ], function($, _, Backbone, vent, LocationsView, LocationView, HomeView) {

    var AppRouter = Backbone.Router.extend({
      routes: {
      // Define some URL routes
      'locations/:id': 'showLocation',
      'locations': 'showLocations',

      // Default
      '*actions': 'defaultAction'
    }
  });

    var initialize = function(){

      var app_router = new AppRouter;

      app_router.on('route:showLocations', function(){

        var locationsView = new LocationsView();
        locationsView.collection.fetch({
          success:function(data){
            locationsView.render();
          },
          failure: function(err){
              // TODO: Alertify
            }
          });

      });

      app_router.on('route:showLocation', function (id) {
                console.log('route:showLocation');

        var locationView = new LocationView();
        locationView.model.url = "/locations/"+id;
        locationView.model.fetch({
          success:function(data){
            locationView.render();
          },
          failure: function(err){
              // TODO: Alertify
            }})
      });

      app_router.on('route:defaultAction', function (actions) {

       // We have no matching route, do nothing
       var homeView = new HomeView();
       homeView.render();
     });

      vent.on("navigate:locations", function () {
        app_router.navigate("/locations", true);
      });

      vent.on("navigate:location", function (id) {

        app_router.navigate("/locations/" + id, true);
      });
      
      Backbone.history.start({pushState:true});
    };
    return { 
      initialize: initialize
    };
  });
