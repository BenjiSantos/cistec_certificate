const web3 = require('../web3.js');
const Certificate = require('../build/Certificate.json');

function getCertificate(address) {
  return new web3.eth.Contract(
    JSON.parse(Certificate.interface),
    address
  )
}

module.exports = getCertificate;