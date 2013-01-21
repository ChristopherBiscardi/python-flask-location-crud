define([
	'jquery',
	'underscore',
	'backbone',
	'vent',
	'collections/locations/LocationsCollection'
	], function($, _, Backbone, vent, LocationsCollection){

		var LocationsView = Backbone.View.extend({
			el: $(".content"),
			collection: new LocationsCollection(),
			events:{
				"click [data-role='LocationsView:show_location']":"show_location"
			},
			render: function(){
				console.log('LocationsView:render');
				console.log(this.collection.toJSON());
				locs = this.transform(this.collection.toJSON());
				$(this.el).html(Handlebars.templates.locations({
					locations:locs
				}));
				return this;
			},
			transform: function(arr) {
				//turns [{},{},{}] into [[{},{}],[{}]] for dual-grid Handlebars
				var result = [], temp = [];

				arr.forEach( function ( elem, i ) {
					//create temp array ever other elem
					if ( i > 0 && i % 2 === 0 ) {
						result.push( temp );
						temp = [];
					}
					//push elem into temp array
					temp.push( elem );
				});

				if ( temp.length > 0 ) {
					//insert last temp array (we do this for the others in the top for foreach)
					result.push( temp );
				}
				return result;
			},
			show_location: function(e){
				e.preventDefault();
				vent.trigger("navigate:location", $(e.currentTarget).data("loc-id"));
			}

		});

		return LocationsView;

	});
