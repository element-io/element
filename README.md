Element
=======
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Base class for minimal elements.


## Installation

``` bash
$ npm install minimal-element-class
```


## Usage

To create a new element,

``` javascript
var Element = require( 'minimal-element-class' );

var element = new Element();
```

The `element` instance has the following methods...


#### attr( [name, [value]] )

This method is a setter/getter. If no arguments are provided, returns an `object` containing all attribute-value pairs. If only a `name` is provided, returns the corresponding attribute `value`. If the attribute does not exist, returns `undefined`. If a `name` and `value` are provided, sets the attribute `value`.

``` javascript
// Set an attribute value:
element.attr( 'class', 'beep' );
element.attr( 'id', 'boop' );

// Get the `class` attribute's value:
element.attr( 'class' );
// Returns 'beep'

// Get all attribute value pairs:
element.attr();
// Returns {'class':'beep','id':'boop'}
```

Note: to set an attribute `value`, the `value` must be either a `string`, `boolean`, or `number`.


#### isVoid()

Returns a boolean indicating if an element is a [void element](http://www.w3.org/TR/html-markup/syntax.html).

``` javascript
element.isVoid();
```

#### append( node )

Appends a node (Element or [Text](https://github.com/element-io/text) instance) to an `element`. If the `element` is a [void element](http://www.w3.org/TR/html-markup/syntax.html), this method will throw an `Error`.

``` javascript
var el = new Element();

element.append( el );
```

When an `element` is serialized, nested elements are serialized in the order in which they were appended.


#### toString()

Serializes an `element` as a `string`.

``` javascript
element.toString();
// Returns '<tag>...</tag>'
```


## Examples

``` javascript
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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

### Inheritance

Classes which inherit from the `Element` class should set the `name` and `void` private properties. Unless the serialization method `toString()` is overwritten, both of these properties are used when serializing an `element` instance.

``` javascript
function HTMLElement( name ) {
	Element.call( this );
	this._name = name;
	this._void = false;
	return this;
}

HTMLElement.prototype = Object.create( Element.prototype );

HTMLElement.prototype.constructor = HTMLElement;
```



## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.



[npm-image]: http://img.shields.io/npm/v/minimal-element-class.svg
[npm-url]: https://npmjs.org/package/minimal-element-class

[travis-image]: http://img.shields.io/travis/element-io/minimal-element-class/master.svg
[travis-url]: https://travis-ci.org/element-io/minimal-element-class

[coveralls-image]: https://img.shields.io/coveralls/element-io/minimal-element-class/master.svg
[coveralls-url]: https://coveralls.io/r/element-io/minimal-element-class?branch=master

[dependencies-image]: http://img.shields.io/david/element-io/minimal-element-class.svg
[dependencies-url]: https://david-dm.org/element-io/minimal-element-class

[dev-dependencies-image]: http://img.shields.io/david/dev/element-io/minimal-element-class.svg
[dev-dependencies-url]: https://david-dm.org/dev/element-io/minimal-element-class

[github-issues-image]: http://img.shields.io/github/issues/element-io/minimal-element-class.svg
[github-issues-url]: https://github.com/element-io/minimal-element-class/issues