// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Node utilities:
	util = require( 'util' ),

	// Module to be tested:
	Element = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'Element', function tests() {
	'use strict';

	// SETUP //

	var element;

	beforeEach( function() {
		element = new Element();
	});

	// Mock elements...
	function VoidElement() {
		Element.call( this );
		this._void = true;
		return this;
	}
	VoidElement.prototype = Object.create( Element.prototype );
	VoidElement.prototype.constructor = VoidElement;

	function Div() {
		Element.call( this );
		this._name = 'div';
		this._void = false;
		return this;
	}
	Div.prototype = Object.create( Element.prototype );
	Div.prototype.constructor = Div;


	// TESTS //

	it( 'should do export a constructor', function test() {
		expect( Element ).to.be.a( 'function' );
	});

	describe( 'attr', function tests() {

		it( 'should provide a method to set/get element attributes', function test() {
			expect( element.attr ).to.be.a( 'function' );
		});

		it( 'should throw an error if provided a non-string attribute name', function test() {
			var values = [
					5,
					true,
					undefined,
					null,
					function(){},
					{},
					[],
					NaN
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[ i ] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					element.attr( value );
				};
			}
		});

		it( 'should throw an error if provided a non-string attribute name', function test() {
			var values = [
					5,
					true,
					undefined,
					null,
					function(){},
					{},
					[],
					NaN
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[ i ] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					element.attr( value );
				};
			}
		});

		it( 'should throw an error if provided a non-string/non-boolean/non-numeric attribute value', function test() {
			var values = [
					undefined,
					null,
					function(){},
					{},
					[],
					NaN
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[ i ] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					element.attr( 'class', value );
				};
			}
		});

		it( 'should set an attribute value', function test() {
			element.attr( 'class', 'beep' );
			assert.strictEqual( element.attr( 'class' ), 'beep' );
		});

		it( 'should return all attribute value pairs', function test() {
			element
				.attr( 'class', 'beep' )
				.attr( 'property', 'beep' );

			assert.deepEqual( element.attr(), {'class':'beep','property':'beep'} );
		});

	});

	describe( 'isVoid', function tests() {

		it( 'should provide a method to determine whether an element is a void element', function test() {
			expect( element.isVoid ).to.be.a( 'function' );
		});

		it( 'should return whether an element is void', function test() {
			assert.isBoolean( element.isVoid() );
		});

	});

	describe( 'append', function tests() {

		it( 'should provide a method to append elements to an element', function test() {
			expect( element.append ).to.be.a( 'function' );
		});

		it( 'should throw an error if one tries to append to a void element', function test() {
			var el = new VoidElement();
			expect( foo ).to.throw( Error );
			function foo() {
				el.append( new Element() );
			}
		});

		it( 'should throw an error if one tries to append a non-Element or non-TextNode', function test() {
			expect( foo ).to.throw( Error );
			function foo() {
				element.append( new Date() );
			}
		});

		it( 'should append elements', function test() {
			var elements = [ new Div(), new Div() ];

			elements[ 0 ].append( elements[ 1 ] );

			assert.strictEqual( elements[0].toString(), '<div><div></div></div>' );
		});

	});

	describe( 'toString', function tests() {

		it( 'should provide a serialization method', function test() {
			expect( element.toString ).to.be.a( 'function' );
		});

		it( 'should serialize an element as a string', function test() {
			assert.strictEqual( element.toString(), '<></>' );
		});

		it( 'should serialize nested elements', function test() {
			var el1 = new Div(),
				el2 = new Div();

			el1.attr( 'class', 'beep' );
			el2.attr( 'class', 'boop' );

			el1.append( el2 );

			assert.strictEqual( el1.toString(), '<div class="beep"><div class="boop"></div></div>' );
		});

		it( 'should serialize void elements', function test() {
			var el = new VoidElement();
			assert.strictEqual( el.toString(), '</>' );
		});

	});

});