// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract EncryptedSharableFile {

    // Definitions

    struct File {
        uint256 id;
        string name; // this doesnt belong in this level of abstraction i think but perhaps it does
        mapping(address => ) keys; // this will be the encrypted key for the file
        string data; // this will be the encrypted data for the file
    }

}