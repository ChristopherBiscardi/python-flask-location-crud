require.config({
	paths: {
		jquery: 'libs/jquery/jquery-min',
		underscore: 'libs/underscore/underscore-min',
		backbone: 'libs/backbone/backbone-min',
		handlebars: 'templates/handlebars.runtime',
		templates: 'templates/templ',
		alertify: 'libs/alertify/alertify.min'
	},
	// shim for clarity. Doesn't affect anything currently
	shim: {
		'templates': {
			deps: ['handlebars'],
			exports: 'Handlebars'
		}
	}

});

require([
	'app',
	'handlebars',
	'templates'

	], function(App){
console.log('ss3');
	// TODO: Wrap Handlebars so it's not a global.

	App.initialize();
});
