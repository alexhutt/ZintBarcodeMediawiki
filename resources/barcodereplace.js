function transformBarcodes() {
	wasmzint(
		{
			locateFile: (f) => {
				return mw.config.values.wgServer + mw.config.values.wgScriptPath + '/extensions/ZintBarcode/resources/ext.zintBarcode/' + f
			}
		}
	).then(function (Module) {
		function barcodeFromElement(wrapper_e) {
			if (wrapper_e.getElementsByTagName("canvas").length > 0) {
				return
			}
			let canvas_e = document.createElement("canvas");
			canvas_e.style = "image-rendering:pixelated;"
			wrapper_e.append(canvas_e)
			try {
				wrapper_e.getElementsByClassName("alt-loading")[0].className += " hide"
			}
			catch (err) {
				console.error('Unexpected Barcode HTML Structure. Javascript mismatch?')
			}

			function DefaultFromDataset(dataset, attribute, default_value) {
				if (attribute in dataset === false) {
					return default_value
				}
				else if (dataset[attribute] == undefined) {
					return default_value
				}
				else if (dataset[attribute] === "") {
					return default_value
				}
				return dataset[attribute]
			}

			//See 5.8 Specifying a Symbology (https://www.zint.org.uk/manual/chapter/5)
			// options on https://www.zint.org.uk/manual/chapter/6/6
			var instance = new Module.ZintWrapper(
				DefaultFromDataset(wrapper_e.dataset, 'barcodeType', 0),
				DefaultFromDataset(wrapper_e.dataset, 'barcodeData', ''),
				true,
				false,
				DefaultFromDataset(wrapper_e.dataset, 'barcodeOption1', -1),
				DefaultFromDataset(wrapper_e.dataset, 'barcodeOption2', 0),
				DefaultFromDataset(wrapper_e.dataset, 'barcodeOption3', 0),
				DefaultFromDataset(wrapper_e.dataset, 'barcodeOptionOut', 0)
			);
			instance.render(wrapper_e.dataset.height, wrapper_e.dataset.scale);
			bitmapRGBA = new Uint8ClampedArray(instance.width * instance.height * 4)
			const bitmapRGB = instance.getBitmap()
			const bitmapA = instance.getBitmapAlpha()
			for (let i = 0; i < instance.width * instance.height * 4; i++) {
				if (i % 4 !== 3) {
					bitmapRGBA[i] = bitmapRGB[Math.floor(i - i / 4)]
				}
				else if (bitmapA) { // Alpha
					bitmapRGBA[i] = bitmapA[Math.floor(i - (i / 4) * 3)]
				}
				else {
					bitmapRGBA[i] = 255
				}
			}
			canvas_e.width = instance.width
			canvas_e.height = instance.height
			const ctx = canvas_e.getContext('2d');
			const img = new ImageData(bitmapRGBA, instance.width, instance.height);
			ctx.putImageData(img, 0, 0);
			instance.delete();
		}

		const barcode_divs = document.getElementsByClassName('barcode-wrapper')
		for (const wrapper_e of barcode_divs) {
			barcodeFromElement(wrapper_e);
		}


	});
}

mw.hook('wikipage.content').add(transformBarcodes)
mw.hook('postEdit').add(transformBarcodes)
