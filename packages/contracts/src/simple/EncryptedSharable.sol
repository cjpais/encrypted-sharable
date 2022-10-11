// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract EncryptedSharable {
    // Definitions

    struct EncryptionKey {
        address person;
        bytes24 nonce;
        bytes32 ephemeralPublicKey;
        bytes encryptedKey; // its 48 bytes to encrypt a 128bit AES key
    }

    struct Data {
        address creator;
        bytes data; // encrypted data (it could be a file or arbitrary data). if http/ipfs will decrypt on client side. assumed to be direct bytes to be unencrypted in a Buffer
        // mapping(address => EncryptionKey) keys; // this will be the encrypted key for the file
        EncryptionKey[] keys;
        // uint256 numKeys; // the number of keys. if 0, then the file is public and the data is unencrypted
        bytes userData; // maybe metadata or something who knows, just a place to put arbitrary data for now in experimental phase
    }

    // Events
    event DataCreated(
        uint256 id,
        address creator,
        bytes data,
        bytes userData,
        EncryptionKey[] keys
    );

    event KeyAdded(uint256 id, EncryptionKey key);

    // Errors

    error DataNotFound();
    error Unauthorized();

    // Storage
    mapping(uint256 => Data) public data;
    mapping(address => uint256) public userAccess;

    uint256 public dataCount;

    // Functions

    function create(
        bytes memory _data,
        EncryptionKey[] memory keys,
        bytes memory userData
    ) public returns (uint256) {
        uint256 id = dataCount;

        Data storage d = data[id];

        d.creator = msg.sender;
        d.data = _data;
        d.keys = keys;
        // d.numKeys = keys.length;
        d.userData = userData;

        for (uint256 i = 0; i < keys.length; i++) {
            userAccess[keys[i].person] = id;
        }

        dataCount++;
        return id;
    }

    function addKey(uint256 id, EncryptionKey memory key) public {
        // data should exist
        if (id >= dataCount) revert DataNotFound();
        // user should be the owner
        if (data[id].creator != msg.sender) revert Unauthorized();

        data[id].keys.push(key);
        userAccess[key.person] = id;
    }

    function getKeySelf(uint256 id) public view returns (EncryptionKey memory) {
        return getKey(id, msg.sender);
    }

    function getKey(uint256 id, address addr)
        public
        view
        returns (EncryptionKey memory)
    {
        // data should exist
        if (id >= dataCount) revert DataNotFound();
        return data[id].keys[userAccess[addr]];
    }

    function getData(uint256 id) public view returns (Data memory) {
        // data should exist
        if (id >= dataCount) revert DataNotFound();
        return data[id];
    }
}
