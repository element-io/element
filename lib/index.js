/**
*
*	MINIMAL ELEMENT
*
*
*	DESCRIPTION:
*		- Base class for minimal elements.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var Text = require( 'minimal-text-class' );


	// ELEMENT //

	/**
	* FUNCTION: Element()
	*	Element constructor.
	*
	* @constructor
	* @returns {Element} Element instance
	*/
	function Element() {
		this._name = '';
		this._void = false;
		this._attributes = {};
		this._children = [];
		return this;
	} // end FUNCTION Element()

	/**
	* METHOD: attr( [name[, value] )
	*	Element attribute setter and getter. If no arguments are provided, returns an object containing all attribute-value pairs. If only a `name` is provided, returns the corresponding attribute `value`. If the attribute does not exist, returns `undefined`. If a `name` and `value` are provided, sets the attribute. Note: if the attribute already exists, overwrites the previous attribute `value`.
	*
	* @param {String} name - attribute name
	* @param {String|Number|Boolean} [value] - attribute value
	* @returns {Element|String} Element instance or attribute value
	*/
	Element.prototype.attr = function( name, value ) {
		var type;
		if ( !arguments.length ) {
			// Return a copy to prevent direct tampering.
			return JSON.parse( JSON.stringify( this._attributes ) );
		}
		if ( typeof name !== 'string' ) {
			throw new TypeError( 'attr()::invalid input argument. Attribute name must be a string.' );
		}
		if ( arguments.length === 1 ) {
			return this._attributes[ name ];
		}
		type = typeof value;
		if ( type !== 'string' && type !== 'boolean' && ( type !== 'number' || value !== value ) ) {
			throw new TypeError( 'attr()::invalid input argument. Attribute value must be a string, number, or boolean.' );
		}
		this._attributes[ name ] = value.toString();
		return this;
	}; // end METHOD attr()

	/**
	* METHOD: void()
	*	Returns a boolean indicating whether the element is a `void` element. See [spec]{@link http://www.w3.org/TR/html-markup/syntax.html}.
	*
	* @returns {Boolean} boolean indicating if an element is a void element.
	*/
	Element.prototype.void = function() {
		return this._void;
	}; // end METHOD void()

	/**
	* METHOD: append( node )
	*	Appends a node (Element or Text instance).
	*
	* @param {Element|Text} node - Element or Text instance to be appended (nested)
	* @returns {Element} Element instance
	*/
	Element.prototype.append = function( node ) {
		if ( this._void ) {
			throw new Error( 'append()::invalid operation. Cannot append to a `void` element.' );
		}
		if ( !( node instanceof Element ) && !( node instanceof Text ) ) {
			throw new TypeError( 'append()::invalid input argument. Argument must be either an Element or Text instance.' );
		}
		this._children.push( node );
		return this;
	}; // end METHOD append()

	/**
	* METHOD: toString()
	*	Serializes the element as a string.
	*
	* @returns {String} serialized element
	*/
	Element.prototype.toString = function() {
		var attrs = this._attributes,
			names = Object.keys( attrs ),
			kids = this._children,
			attr,
			str;

		// Opening tag and attributes...
		str = '<' + this._name;
		for ( var i = 0; i < names.length; i++ ) {
			attr = names[ i ];
			str += ' ' + attr + '=\"' + attrs[ attr ] + '\"';
		}

		// If the element is a void element, self-close and return...
		if ( this._void ) {
			str += '/>';
			return str;
		}
		str += '>';

		// Children...
		for ( var j = 0; j < kids.length; j++ ) {
			str += kids[ j ].toString();
		}

		// Closing tag:
		str += '</' + this._name + '>';

		return str;
	}; // end METHOD toString()


	// EXPORTS //

	module.exports = Element;

})();