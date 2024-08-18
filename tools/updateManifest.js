const fs = require('fs');

const manifestContents = fs.readFileSync('src/assets/manifest.json', { encoding: 'utf8', flag: 'r' });

const manifest = JSON.parse(manifestContents);

const packageContents = fs.readFileSync('package.json', { encoding: 'utf8', flag: 'r' });

const package = JSON.parse(packageContents);

const versionNumber = package.version;

manifest.version = versionNumber;

newManifestContents = JSON.stringify(manifest, null, 2);

fs.writeFileSync('src/assets/manifest.json', newManifestContents);