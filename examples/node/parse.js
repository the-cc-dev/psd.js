var fs = require('fs');
var PSD = require('../../dist/psd.js').default;
var PSDTools = require('../../dist/psd-node.js');

var file = process.argv[2] || './examples/images/example.psd';
var psd = new PSD(fs.readFileSync(file));
psd.parse();

console.log(psd.header.export());
console.log(psd.resources.resource('layerComps').export());
console.log(psd.layerMask.layers.length, 'Layers');

psd.layerMask.layers.forEach(function (layer) {
  console.log("Name:", layer.name);
  console.log("Folder start:", layer.isFolder());
  console.log("Folder end:", layer.isFolderEnd());
  console.log("Available info:", layer.availableInfoKeys);
  console.log("Parsed info:", layer.parsedInfoKeys);

  if (layer.adjustments.blendClippingElements) {
    console.log("Blend clipping elements:", layer.adjustments.blendClippingElements.enabled);
  }

  console.log("");
})

PSDTools.PNG.saveAsPng(psd.image, './output.png').then(function () {
  console.log("Image written to output.png!");
});

console.log(psd.tree().children().length);

const logoGlyph = psd.tree().childrenAtPath("Version D/Logo_Glyph")[0];
console.log(logoGlyph.name);
console.log(logoGlyph.path());
