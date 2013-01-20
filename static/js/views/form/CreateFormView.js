define([
	'jquery',
	'underscore',
	'backbone',
	'vent',
	'alertify'
	], function($, _, Backbone, vent, alertify){

		var CreateFormView = Backbone.View.extend({

			events:{
				"submit form":"form_submit",
				"click a":"show_locations"
			},
			render: function(){
				$(this.el).html(Handlebars.templates.create_form({locations_link:true}));
				return this;
			},
			form_submit:function(e){
				e.preventDefault();
				var name = this.$el.find("input[name='name']").val();
				var address = this.$el.find("input[name='address']").val();
				if(name && address){
					//TODO: Disallow pushing of submit button after a submission
					$.ajax({
						url: '/locations',
						type: 'POST',
						data: {
							name:name,
							address:address
						},
						dataType: 'json',
						accepts:{
							json:'application/json'
						}
					}).done(function(data, textStatus, jqXHR){
						console.log(data, textStatus);
						if(data.success){
							alertify.success("Successfully Created. Redirecting.");
							console.log(data);
							vent.trigger('navigate:location', data.location);
						}else{
							alertify.error("Something Went Wrong!");
						}
					}).fail(function(jqXHR, textStatus, errorThrown){
						alertify.error("Something Went Wrong!");
						console.log(textStatus, errorThrown);
					});
				} else{
					alertify.alert( "Please make sure both fields are filled out", function () { 
						console.log('ok');
					});
				}
			},
			show_locations: function(e){
				e.preventDefault();
				vent.trigger("navigate:locations");
			}

		});

return CreateFormView;

});
