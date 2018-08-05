/*
	Terminal Kit

	Copyright (c) 2009 - 2018 Cédric Ronvel

	The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

"use strict" ;



var Element = require( './Element.js' ) ;
var ScreenBuffer = require( '../ScreenBuffer.js' ) ;
var TextBuffer = require( '../TextBuffer.js' ) ;



function TextBox( options = {} ) {
	Element.call( this , options ) ;

	this.textAttr = options.textAttr || options.attr || { bgColor: 'black' , color: 'white' } ;
	this.emptyAttr = options.emptyAttr || options.textAttr || options.attr || { bgColor: 'black' , color: 'white' } ;
	this.textBuffer = null ;
	this.contentSize = null ;

	this.textBuffer = new TextBuffer( {
		dst: this.outputDst ,
		x: this.outputX ,
		y: this.outputY
	} ) ;

	this.textAttr = ScreenBuffer.object2attr( this.textAttr ) ;
	this.emptyAttr = ScreenBuffer.object2attr( this.emptyAttr ) ;
	this.textBuffer.setEmptyCellAttr( this.emptyAttr ) ;

	this.setContent( options.content , options.contentHasMarkup , true ) ;

	// Only draw if we are not a superclass of the object
	if ( this.elementType === 'TextBox' && ! options.noDraw ) { this.draw() ; }
}

module.exports = TextBox ;

TextBox.prototype = Object.create( Element.prototype ) ;
TextBox.prototype.constructor = TextBox ;
TextBox.prototype.elementType = 'TextBox' ;



TextBox.prototype.getContent = function getContent() {
	return this.textBuffer.getText() ;
} ;



TextBox.prototype.setContent = function setContent( content , hasMarkup , dontDraw ) {
	var contentSize ;

	this.content = content ;
	this.contentHasMarkup = !! hasMarkup ;

	if ( hasMarkup ) { throw new Error( 'Not coded!' ) ; }

	this.textBuffer.setText( this.content ) ;
	contentSize = this.textBuffer.getContentSize() ;
	this.outputWidth = contentSize.width ;
	this.outputHeight = contentSize.height ;

	this.textBuffer.setAttrCodeRegion( this.textAttr ) ;

	if ( ! dontDraw ) { this.redraw() ; }
} ;



TextBox.prototype.destroy = function destroy( isSubDestroy ) {
	Element.prototype.destroy.call( this , isSubDestroy ) ;
} ;



TextBox.prototype.postDrawSelf = function postDrawSelf() {
	//this.outputDst.put( { x: this.outputX , y: this.outputY , attr: this.textAttr } , this.content ) ;
	this.textBuffer.draw( { srcClipRect: {
		x: 0 , y: 0 , width: this.outputWidth , height: this.outputHeight
	} } ) ;
} ;

