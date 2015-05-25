#!/usr/bin/env node
/*
	The Cedric's Swiss Knife (CSK) - CSK terminal toolbox test suite
	
	Copyright (c) 2009 - 2014 Cédric Ronvel 
	
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

/* jshint unused:false */



var term = require( '../lib/termkit.js' ).terminal ;

term.grabInput( { mouse: 'button' } ) ;

term.on( 'key' , function( key , matches , data ) {
	
	switch ( key )
	{
		case 'UP' :
			term.up( 1 ) ;
			break ;
		case 'DOWN' :
			term.down( 1 ) ;
			break ;
		case 'LEFT' :
			term.left( 1 ) ;
			break ;
		case 'RIGHT' :
			term.right( 1 ) ;
			break ;
		case 'CTRL_C' :
			process.exit() ;
			break ;
		default:
			// Echo anything else
			term.noFormat( Buffer.isBuffer( data.code ) ? data.code : String.fromCharCode( data.code ) ) ;
			break ;
	}
} ) ;

term.on( 'mouse' , function( name , data ) {
	term.moveTo( data.x , data.y ) ;
} ) ;