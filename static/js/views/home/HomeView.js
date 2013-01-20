define([
	'jquery',
	'underscore',
	'backbone',
	'views/form/CreateFormView',
	], function($, _, Backbone, CreateFormView){

		var HomeView = Backbone.View.extend({
			el: $(".content"),

			render: function(){
				this.$el.html(Handlebars.templates.home_setup({}));
				var createFormView = new CreateFormView({el: this.$el.find(".span4")})
				createFormView.render();
			}

		});

		return HomeView;

	});
