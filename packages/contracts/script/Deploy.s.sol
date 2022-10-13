// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import "../src/simple/EncryptedSharable.sol";
import "../src/simple/PublicKeyRegistry.sol";

contract Deploy is Script {
    PublicKeyRegistry registryContract;
    EncryptedSharable sharableContract;

    function run() public {
        // Deployment config from .env.local file
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        // Deploy registry contract
        // registryContract = new PublicKeyRegistry();

        // Deploy sharable contract
        sharableContract = new EncryptedSharable();

        vm.stopBroadcast();
    }
}
