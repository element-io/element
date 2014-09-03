var Element = require( './../lib' );

// Create a class which inherits from Element...

function HTMLElement( name ) {
	Element.call( this );
	this._name = name;
	this._void = false;
	return this;
}

HTMLElement.prototype = Object.create( Element.prototype );

HTMLElement.prototype.constructor = HTMLElement;


// Create a new parent container...

var container = new HTMLElement( 'div' );
container.attr( 'class', 'container' );

// Build other components...

var col = new HTMLElement( 'div' );
col.attr( 'class', 'column' );

var h1 = new HTMLElement( 'h1' );
h1.attr( 'class', 'title' )
	.attr( 'id', 'title' );

var p = new HTMLElement( '' );
p.attr( 'class', 'content' );

// Create the document structure...

container.append( col );
col.append( h1 )
	.append( p );

// Serialize to string...

console.log( container.toString() );
// Returns: '<div class="container"><div class="column"><h1 class="title" id="title"></h1><p class="content"></p></div></div>'