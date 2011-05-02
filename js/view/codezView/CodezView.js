define(
[
	'when',
	'querySelectorAll',
	'text!./CodezView.html',
	'cssx/css!./CodezView.css'
],
function(when, querySelectorAll, template) {

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
				
				if(/\bproceed-button\b/.test(e.target.className)) {
					d.resolve(e.target.value);
				}
				else if(/\bpirate-button\b/.test(e.target.className)) {
					// change state
					var view = querySelectorAll('.codez-view', self.node)[0];
					view.className += ' answered';
					// TODO: record score
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
