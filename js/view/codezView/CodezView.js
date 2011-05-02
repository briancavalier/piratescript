define(
[
	'when',
	'text!./CodezView.html',
	'cssx/css!./CodezView.css'
],
function(when, template) {

	var undef;

	function CodezView(node) {
		this.node = node;
		this.render();
	}
	
	CodezView.prototype = {

		render: function(map) {
			var which = (Math.random() * 2) >>> 0;
			map = beget(map);
			map.firstScript = which ? map.pirateScript : map.noobScript;
			map.secondScript = !which ? map.pirateScript : map.noobScript;
			this.node.innerHTML = template.replace(/\$\{(\w+)\}/g, function(s, key) {
				return map && map[key] !== undef ? map[key] : '';
			});
		},
		
		showCodez: function(codez) {
			var d, self;
			
			this.render(codez);
			
			d = when.Deferred();
			self = this;
			
			this.node.onclick = function(e) {
				self.node.onclick = undef;
				
				if(e.target.nodeName == 'BUTTON') {
					d.resolve(e.target.value);
				}
			};
			
			return d.promise;
		}
	};

	function F () {}
	function beget (o) {
		var result;
		F.prototype = o;
		result = new F();
		F.prototype = undef;
		return result;
	}

	return CodezView;

});
