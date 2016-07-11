function BindEvents( obj ){

	var self = this;
	var exports = obj || {};
	exports.events = {};
	exports.events.listeners = {};

	exports.events.addEvent = function( event, fn, params ){
		exports.events.listeners[event] = exports.events.listeners[event] || [];
		var e = { fn: fn };
		if( params ) Object.merge( e, params );
		exports.events.listeners[event].push( e );
		if(exports.events.listeners['listener']){
			exports.emit( 'listener', event );
		}
		return false;
	};
	
	exports.hasListener = function( event ){
		return exports.events.listeners[event] ? true : false;
	};
			
	exports.emit = function(){
		var event = arguments[0];

		var args = Array.prototype.slice.call(arguments, 1);
		if(exports.events.listeners[event] && exports.events.listeners[event].length > 0){
			var rc = 0;
			var newE = [];
			for(var l=0;l<exports.events.listeners[event].length;l++){
				var indx = (l - rc);
				exports.events.listeners[event][l].fn.apply( null, args );
				if( !exports.events.listeners[event][l].once ){ 
					newE.push(exports.events.listeners[event][l]);
				}
			}
			if( newE.length == 0 ) delete exports.events.listeners[event];
			if(exports.events.listeners[event])exports.events.listeners[event] = newE;
		}
		return false;
	};
	
	exports.once = function(event, fn){
		new exports.events.addEvent( event, fn, { once: true } );
		return false;
	};
	
	exports.on = function(event, fn){
		new exports.events.addEvent( event, fn, null );
		return exports;
	};
	
	return exports;
	
}
