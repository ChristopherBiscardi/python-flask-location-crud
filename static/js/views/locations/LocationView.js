define([
	'jquery',
	'underscore',
	'backbone',
	'vent',
	'alertify',
	'models/locations/LocationModel'
	], function($, _, Backbone, vent, alertify, LocationModel){

		var LocationView = Backbone.View.extend({
			el: $(".content"),
			model: new LocationModel(),
			events:{
				"click .btn-danger":"delete_location"
			},
			render: function(){
				this.$el.html(Handlebars.templates.location({location:this.transform(this.model.toJSON())}));
				return this;
			},
			transform: function(obj){
				obj.lat = obj.loc[1];
				obj.lng = obj.loc[0];
				return obj;
			},
			delete_location:function(e){
				e.preventDefault();
				var self = this;

				$.ajax({
					url: '/locations/'+$(e.currentTarget).data("loc-id"),
					type: 'DELETE',
					dataType: 'json',
					accepts:{
						json:'application/json'
					}
				}).done(function(data, textStatus, jqXHR){
					console.log(data, textStatus);
					if(data.success){
						alertify.success("Successfully Deleted. Redirecting.");
						self.show_locations();
					}else{
						alertify.error("Something Went Wrong!");
					}
				}).fail(function(jqXHR, textStatus, errorThrown){
					alertify.error("Something Went Wrong!");
				});

			},
			show_locations: function(e){
				// e.preventDefault();
				vent.trigger("navigate:locations");
			}

		});

return LocationView;

});
