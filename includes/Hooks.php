<?php
/**
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * @file
 */

namespace MediaWiki\Extension\ZintBarcode;

class Hooks implements \MediaWiki\Hook\ParserFirstCallInitHook {

	/**
	 * @see https://www.mediawiki.org/wiki/Manual:Hooks/ParserFirstCallInit
	 * @param \Parser $parser
	 */
	public function onParserFirstCallInit( $parser ) {
		$parser->setHook( 'barcode', [ self::class, 'renderBarcode' ] );
	}

	/**
	 * Render <barcode>
	 * @param \String $input
	 * @param \array $args
	 * @param \Parser $parser
	 * @param \mixed $frame
	 * @return \String
	 */
	public static function renderBarcode( $input, array $args, $parser, $frame ) {
		$parser->getOutput()->addModules( 'ext.zintBarcode' );

		if ( !array_key_exists( 'type', $args ) ) {
			$args['type'] = 0;
		}
		if ( !array_key_exists( 'height', $args ) ) {
			$args['height'] = 10;
		}
		if ( !array_key_exists( 'scale', $args ) ) {
			$args['scale'] = 1;
		}
		if ( !array_key_exists( 'option1', $args ) ) {
			$args['option1'] = -1;
		}
		if ( !array_key_exists( 'option2', $args ) ) {
			$args['option2'] = 0;
		}
		if ( !array_key_exists( 'option3', $args ) ) {
			$args['option3'] = 0;
		}
		if ( !array_key_exists( 'option-out', $args ) ) {
			$args['option-out'] = 0;
		}

		return '<div class="barcode-wrapper"' .
		'data-barcode-type="' . htmlspecialchars( $args['type'] ) . '"' .
		'data-height="' . htmlspecialchars( $args['height'] ) . '"' .
		'data-scale="' . htmlspecialchars( $args['scale'] ) . '"' .
		'data-barcode-option1="' . htmlspecialchars( $args['option1'] ) . '"' .
		'data-barcode-option2="' . htmlspecialchars( $args['option2'] ) . '"' .
		'data-barcode-option3="' . htmlspecialchars( $args['option3'] ) . '"' .
		'data-barcode-option-out="' . htmlspecialchars( $args['option-out'] ) . '"' .
		'data-barcode-data="' . htmlspecialchars( $input ) . '"' .
		'aria-label="barcode">' .
		'<span class="alt-loading">Barcode [' . htmlspecialchars( $input ) . ']</span>' .
		'</div>';
	}

}
