# Javascript Object Event Binder
Simple function that will add events to any object passed to it.

# Usage:
var foo = {};

BindEvents( foo );

foo.on('eventName', function( arg1, arg2 ){
  
});

foo.emit( 'eventName', arg1, arg2 );
