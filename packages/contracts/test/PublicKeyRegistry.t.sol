// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/simple/PublicKeyRegistry.sol";

contract PublicKeyRegistryTest is Test {
    PublicKeyRegistry public registry;

    function setUp() public {
        registry = new PublicKeyRegistry();
        vm.deal(address(0xD8b979Dc215e552db269553C98f1876823B52D08), 100 ether);
    }

    function testAddPublicKey() public {
        vm.prank(address(0xD8b979Dc215e552db269553C98f1876823B52D08));
        registry.addPublicKey(
            hex"0b960c35da84e242e0c508493b531fb907073f98635525f36a6cddfd3c654745"
        );

        assertEq(
            registry.publicKeys(
                address(0xD8b979Dc215e552db269553C98f1876823B52D08)
            ),
            bytes32(
                hex"0b960c35da84e242e0c508493b531fb907073f98635525f36a6cddfd3c654745"
            )
        );
        assertEq(
            registry.getPublicKey(
                address(0xD8b979Dc215e552db269553C98f1876823B52D08)
            ),
            bytes32(
                hex"0b960c35da84e242e0c508493b531fb907073f98635525f36a6cddfd3c654745"
            )
        );
    }
}
