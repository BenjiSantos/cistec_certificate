pragma solidity ^0.4.19;

contract CertificateRegistry {
    address [] public registeredCertificates;
    event ContractCreated(address contractAddress);

    function createCertificate(string _fullName, string _courseName, string _courseTime, string _courseDate, string _period, string _average, string _certificateNumber) public {
        address newCertificate = new Certificate(msg.sender, _fullName, _courseName, _courseTime, _courseDate, _period, _average, _certificateNumber);
        emit ContractCreated(newCertificate);
        registeredCertificates.push(newCertificate);
    }

    function getDeployedCertificates() public view returns (address[]) {
        return registeredCertificates;
    }
}

/**
 * @title Certificate
 * @dev The Certificate contract provides basic storage for studients
 */
contract Certificate {

    // Owner address
    address public owner;

    /// Certificate
    string public fullName;
    string public courseName;
    string public courseTime;
    string public courseDate;
    string public period;
    string public average;
    string public certificateNumber;

    /**
    * @dev Throws if called by any account other than the owner
    */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
    * @dev Constructor sets the original `owner` of the contract to the sender account, and
    * commits the marriage details and vows to the blockchain
    */
    constructor(address _owner, string _fullName, string _courseName, string _courseTime, string _courseDate, string _period, string _average, string _certificateNumber) public {
        // TODO: Assert statements for year, month, day
        owner = _owner;
        fullName = _fullName;
        courseName = _courseName;
        courseTime = _courseTime;
        courseDate = _courseDate;
        period = _period;
        average = _average;
        certificateNumber = _certificateNumber;

    }

    /**
    * @dev returns contract metadata in one function call, rather than separate .call()s
    * Not sure if this works yet
    */
    function getCertificateDetails() public view returns (
        address, string, string, string, string, string, string, string) {
        return (
        owner,
        fullName,
        courseName,
        courseTime,
        courseDate,
        period,
        average,
        certificateNumber
        );
    }
}