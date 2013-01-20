define([
	'jquery',
	'underscore',
	'backbone',
	'collections/locations/LocationsCollection'
	], function($, _, Backbone, LocationsCollection){

		var LocationsView = Backbone.View.extend({
			el: $(".content"),
			collection: new LocationsCollection(),
			render: function(){
				// [{
				// 		_id:"sksksid84738jks8shske028s",
				// 		name:'whatever',
				// 		address:"800 market"
				// 	},{
				// 		_id:"sksksid84738jks8shske028s",
				// 		name:'whatever',
				// 		address:"800 market"
				// 	},{
				// 		_id:"sksksid84738jks8shske028s",
				// 		name:'whatever',
				// 		address:"800 market"
				// 	}]
				locs = this.transform(this.collection.toJSON());
				$(this.el).html(Handlebars.templates.locations({
					locations:locs
				}));
			},
			transform: function(arr) {
				var result = [], temp = [];
				arr.forEach( function ( elem, i ) {
					if ( i > 0 && i % 2 === 0 ) {
						result.push( temp );
						temp = [];
					}
					temp.push( elem );
				});
				if ( temp.length > 0 ) {
					result.push( temp );
				}
				return result;
			}

		});

		return LocationsView;

	});
