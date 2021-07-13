const web3 = require('../web3.js');
const CertificateRegistry = require('../build/CertificateRegistry.json');

const instance = new web3.eth.Contract(
  JSON.parse(CertificateRegistry.interface),
  // This is the address of the contract factory
  'XXXXXX',

  // Mainnet
  // '0xf600c8faf89504850e26bcb8c03d04fa5b00ac8f'
);

module.exports = instance;
