# Zint Barcode for MediaWiki

This MediaWiki Extension uses an Emscripten compiled WASM version of Zint
barcode that renders barcodes to a canvas.

## Usage
	<barcode type=20 scale=.5 height=20>1D Barcode Code 11</barcode>
	<barcode type=92 scale=3>Aztec</barcode>
	<barcode type=58 scale=1>QR Code</barcode>
	<barcode type=58 scale=1 option1=4>High Error Correction QR</barcode>

Output:
![Barcode Examples](img/demo.png)

See section 5.8 of [the Zint manual](https://www.zint.org.uk/manual/chapter/5) for different barcode symbologies that can be used in 'type'

[Chapter 6](https://zint.org.uk/manual/chapter/6/1) has symbology specific constants for option1, option2, and option3.

## Installation

from your mediawiki installation directory

	cd extensions
	git clone https://github.com/alexhutt/ZintBarcodeMediawiki ZintBarcode

## Development

The boilerplate for this extension was provided by https://www.mediawiki.org/wiki/Extension:BoilerPlate. `npm test` and `composer test` were provided by this boilerplate and work after `npm install` and `composer install`.