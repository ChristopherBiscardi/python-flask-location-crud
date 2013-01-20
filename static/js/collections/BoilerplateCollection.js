define([
  'jquery',
  'underscore',
  'backbone',
  'models/whatever/Thing'
], function($, _, Backbone, ThingModel){
  var ThingsCollection = Backbone.Collection.extend({
    model: ThingModel,
    
    initialize: function(){

    }

  });
 
  return ThingsCollection;
});
