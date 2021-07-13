import { Injectable, Redirect } from "@nestjs/common";
import { CertificateDto } from "./models/certificate.dto";
import { ResponseCertificateDto } from "./models/responseCertificate.dto";
import { response } from "express";
import * as http from "http";
const CertificateRegistry = require('../ethereum/contracts/CertificateRegistry');
const Certificate = require('../ethereum/contracts/Certificate');
const web3 = require('../ethereum/web3');

@Injectable()
export class AppService {
/*  If you want to use like endpoint this function, use this response that return ResponseCertificateDto like (JSON response)

    async postCreateCertificate(certificate: CertificateDto): Promise<ResponseCertificateDto> {
    console.log("Debug 2")

    const privateKey =
      'e16e71b3138790e3c9376ba6ad46f0d059467a85a5c9d247436da61c3f659168';

    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);

    web3.eth.accounts.wallet.add(account);

    web3.eth.defaultAccount = account.address;

    const transaction = await CertificateRegistry.methods
      .createCertificate(certificate.fullName, certificate.courseName, certificate.courseTime, certificate.courseDate, certificate.period, certificate.average, certificate.certificateNumber)
      .send({ from: web3.eth.defaultAccount, gas: '2000000' });

    const contractAddress =
      transaction.events.ContractCreated.returnValues.contractAddress;

    let responseCertificateDto = new ResponseCertificateDto();
    responseCertificateDto.fullName = certificate.fullName;
    responseCertificateDto.courseName = certificate.courseName;
    responseCertificateDto.courseTime = certificate.courseTime;
    responseCertificateDto.courseDate = certificate.courseDate;
    responseCertificateDto.period = certificate.period;
    responseCertificateDto.average = certificate.average;
    responseCertificateDto.certificateNumber = certificate.certificateNumber;
    responseCertificateDto.contractAddress = contractAddress;
    return responseCertificateDto;
  }*/

  // Similar function, but this render certificate at frontend (HTML response)
  async postCreateCertificate(certificate: CertificateDto): Promise<ResponseCertificateDto> {
    console.log(certificate)

    // PRIV KEY METAMASK
    const privateKey =
      'XXXXXXXX';

    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);

    web3.eth.accounts.wallet.add(account);

    web3.eth.defaultAccount = account.address;

    const transaction = await CertificateRegistry.methods
      .createCertificate(certificate.fullName, certificate.courseName, certificate.courseTime, certificate.courseDate, certificate.period, certificate.average, certificate.certificateNumber)
      .send({ from: web3.eth.defaultAccount, gas: '2000000' });

    const contractAddress =
      transaction.events.ContractCreated.returnValues.contractAddress;

    let responseCertificateDto = new ResponseCertificateDto();
    responseCertificateDto.fullName = certificate.fullName;
    responseCertificateDto.courseName = certificate.courseName;
    responseCertificateDto.courseTime = certificate.courseTime;
    responseCertificateDto.courseDate = certificate.courseDate;
    responseCertificateDto.period = certificate.period;
    responseCertificateDto.average = certificate.average;
    responseCertificateDto.state = certificate.state;
    responseCertificateDto.certificateNumber = certificate.certificateNumber;
    responseCertificateDto.contractAddress = contractAddress;

    return responseCertificateDto;
  }

  async getCertificate(getContractAddress: any): Promise<ResponseCertificateDto> {

    const contract = Certificate(getContractAddress);

    const certificateDetails = await contract.methods.getCertificateDetails().call();

    let certificateDto = new ResponseCertificateDto();
    certificateDto.fullName = certificateDetails[1];
    certificateDto.courseName = certificateDetails[2];
    certificateDto.courseTime = certificateDetails[3];
    certificateDto.courseDate = certificateDetails[4];
    certificateDto.period = certificateDetails[5];
    certificateDto.average = certificateDetails[6];
    certificateDto.certificateNumber = certificateDetails[7];
    certificateDto.contractAddress = getContractAddress;
    return certificateDto;
  }

  // This endpoint is for get all certificate (Yet to test)
/*  async getAllCertificate(): Promise<String> {
    const deployedMarriages = await CertificateRegistry.methods.getDeployedCertificates().call();

    console.log(deployedMarriages);
    // Omits blacklisted contract addresses from list, to not be shown

    // Now contracts are rendered in LIFO order - perfect
    const allMarriages = deployedMarriages.reverse();
    const size = allMarriages.length;

    const certificateContracts = await Promise.all(
      Array(size).map((item, index) => {
        return Certificate(allMarriages[index]);
      })
    );

    // marriageItems are the actual marriage details that will be rendered
    const marriageItems = await Promise.all(
      Array(size).map((item, index) => {
        return certificateContracts[index].methods.getCertificateDetails().call();
      })
    )
    return 'OK';
  }*/

}
