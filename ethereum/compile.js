// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const solc = require('solc');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');

// Deletes current build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// Compile solidity contracts
const campaignPath = path.resolve(__dirname, 'contracts', 'Certificate.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

console.log(output);
fs.ensureDirSync(buildPath);
for (contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract],
  );
}
