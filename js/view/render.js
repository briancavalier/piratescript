define([], function() {
	var undef;
	
	return function render(template, map) {
		return template.replace(/\$\{(\w+)\}/g, function(s, key) { 
			return map && map[key] !== undef ? map[key] : '';
		});
	};
});