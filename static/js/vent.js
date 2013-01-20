define([
	'jquery',
	'underscore',
	'backbone'
	], function($, _, Backbone){
		//Application Event Aggregation Object
		return _.extend({}, Backbone.Events);
	});
