/*!
 * SVG based on jQuery UI Widget
 * Author: SliceMeNice <office@slicemenice.de>
 * Licensed under the MIT license
 *
 *  Requires UI version 1.9+
 */

( function ( $, document, undefined ) {

	$.widget( 'smn.svg', {

		options: {
			referenceAttributeName: 'data-svg-ref',
			svgContentClass: 'svg_content'
		},

		_create: function () {
			var widget = this;

			var svgIdentifier = widget.element.attr( widget.options.referenceAttributeName );

			if ( !svgIdentifier ) {
				throw 'The provided element has no attribute "' + widget.options.referenceAttributeName + '" or the attribute is empty.'
			}

			var symbolSource = $( '#' + svgIdentifier ).get( 0 );

			if ( !symbolSource ) {
				throw 'Could not find an SVG symbol source with id "' + svgIdentifier + '".';
			}

			var svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );

			for ( var k = 0; k < symbolSource.childNodes.length; ++k ) {
				svg.appendChild( symbolSource.childNodes[ k ].cloneNode( true ) );
			}

			svg.setAttribute( 'viewBox', symbolSource.getAttribute( 'viewBox' ) );

			widget.$svgContent = $( '<div></div>' );
			widget.$svgContent.addClass( widget.options.svgContentClass );
			widget.$svgContent.append( svg );

			widget.element.append( widget.$svgContent );
		},

		_destroy: function () {
			var widget = this;

			widget.$svgContent.remove();
			widget.$svgContent = undefined;
		}
	} );

} )( jQuery, document );