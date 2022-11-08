# encrypted-sharable

a proto version of being able to share encrypted files on chain

can have public, private, and shared files.

v1: enable basic encrypted file sharing

v1.1?: be able to remove permissions

v2: might be useful to be able to share with groups of people

v3: add directory support

v3: handle read/write permissions

v4: handle file versioning

v5: migrate to graph schema

## Current Status

* Add public key to registry
* Then can encrypt any data to any public key in the registry
* The reciever(s) of the data can open the data and decrypt it

## TODO

* Move to EIP-5630
    * Use Metamask Snap similar to: https://github.com/skgbafa/dessi/
    * Move to ECIES instead of custom rolled type of ECIES
        * Impacts but simplifies both the contracts and the frontend code
* Add basic permissioning system in
* Add group sharing in
* First class support for encrypted URL data (IPFS especially + cheap storage)
    * It's possible to imagine a drag and drop thing where we use SSTORE2 on a whole bundle of IPFS hash's
