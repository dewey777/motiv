// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IpfsStorage {
    struct File {
        string ipfsHash;
        uint256 timestamp;
    }

    mapping(uint256 => File) public files;
    uint256 public fileCount;

    event FileAdded(uint256 indexed fileId, string ipfsHash, uint256 timestamp);

    function addFile(string memory _ipfsHash) public {
        fileCount++;
        files[fileCount] = File(_ipfsHash, block.timestamp);
        emit FileAdded(fileCount, _ipfsHash, block.timestamp);
    }

    function getFile(uint256 _fileId) public view returns (string memory, uint256) {
        File memory file = files[_fileId];
        return (file.ipfsHash, file.timestamp);
    }
} 