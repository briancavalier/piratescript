/**
 * @license Copyright (c) 2010 Brian Cavalier
 * LICENSE: see the LICENSE.txt file. If file is missing, this file is subject
 * to the MIT License at: http://www.opensource.org/licenses/mit-license.php.
 */

/*
	File: events.js
	wire plugin that sets up subscriptions and topics to be published after
	functions are invoked.  ,
	and disconnect them when an object is destroyed.  This implementation uses
	dojo.publish, dojo.subscribe and dojo.unsubscribe to do the work of connecting and disconnecting
	event handlers.
*/
define(['dojo', 'dojo/_base/connect'], function(pubsub) {

	return {
		wire$plugin: function pubsubPlugin(ready, destroyed, options) {

			var destroyHandlers = [];

			/*
				Function: proxyPublish
				Proxies methods on target so that they publish topics after being
				invoked.  The payload of a topic will be the return value of the method
				that triggered it.

				Parameters:
					target - object whose methods should be proxied
					publish - hash of method names to topics each should publish
			*/
			function proxyPublish(target, publish) {
				var originals = {};

				for(var f in publish) {
					if(typeof target[f] == 'function') {
						var orig = originals[f] = target[f],
							topic = publish[f];

						target[f] = function publishProxy() {
							var result = orig.apply(target, arguments);
							pubsub.publish(topic, [result]);
						};
					}
				}

				destroyHandlers.push(function() {
					unproxyPublish(target, originals);
				});
			}

			/*
				Function: unproxyPublish
				Restores the original functions on object after they've been proxied
				by <proxyPublish> to publish topics.

				Parameters:
					object - object whose methods should be restored
					originals - hash of method names to original methods to restore
			*/
			function unproxyPublish(object, originals) {
				for(var p in originals) {
					object[p] = originals[p];
				}
			}

			function subscribeTarget(target, subscriptions) {
				var subscribeHandles = [];
				for(var topic in subscriptions) {
					var f = subscriptions[topic];
					if(typeof target[f] == 'function') {
						// TODO: How to unsubscribe?
						subscribeHandles.push(pubsub.subscribe(topic, target, f));
					}
				}

				if(subscribeHandles.length > 0) {
					destroyHandlers.push(function() {
						unsubscribeTarget(subscribeHandles);
					});
				}
			}

		    function unsubscribeTarget(handles) {
		        for (var i = handles.length - 1; i >= 0; i--){
					pubsub.unsubscribe(handles[i]);
				}
			}

			destroyed.then(function onContextDestroy() {
				for (var i = destroyHandlers.length - 1; i >= 0; i--){
					destroyHandlers[i]();
				}
			});

			return {
				aspects: {
					publish: {
						initialized: function(promise, aspect, wire) {
							proxyPublish(aspect.target, aspect.options);
							promise.resolve();
						}
					},
					subscribe: {
						initialized: function(promise, aspect, wire) {
							subscribeTarget(aspect.target, aspect.options);
							promise.resolve();
						}
					}
				}
			}
		}
	};
});