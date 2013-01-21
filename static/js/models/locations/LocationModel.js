define([
	'underscore',
	'backbone'
	], function(_, Backbone) {

		var LocationModel = Backbone.Model.extend({
			parse: function(response) {
				if(response.location){
					return response.location;
				}else{
					return response;
				}
			}
		});

		return LocationModel;

	});
