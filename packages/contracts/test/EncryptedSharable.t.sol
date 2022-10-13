// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/simple/EncryptedSharable.sol";

contract EncryptedSharableTest is Test {
    EncryptedSharable public sharable;

    address dataCreator = address(0xD8b979Dc215e552db269553C98f1876823B52D08);
    bytes dataData = hex"74657374";
    bytes userData = hex"";

    EncryptedSharable.EncryptionKey testKey1 =
        EncryptedSharable.EncryptionKey({
            person: address(0xD8b979Dc215e552db269553C98f1876823B52D08),
            nonce: hex"580e51401f5b763499d7f4d76946e62f4810102bd6caa358",
            ephemeralPublicKey: hex"d40aa26b63fc2e790dcc69584a6e694f929324133eefcb99009cab8bac371c4e",
            encryptedKey: hex"36a8564084e306d987305b4f44b9ed9a8a14e6f1a9ce771c566f87d5024945ae8e6603b97b96e2dd8504b85d3dd622f4"
        });
    EncryptedSharable.EncryptionKey testKey2 =
        EncryptedSharable.EncryptionKey({
            person: address(0xD286064cc27514B914BAB0F2FaD2E1a89A91F314), // this is not real data
            nonce: hex"46a22d6f5fe4376bbab9d50cc4943333553a4e0c277a0718",
            ephemeralPublicKey: hex"bf523d782df66bfe50f5bc06329377e5444ea5a9fc8b8033801822bbfd14f968",
            encryptedKey: hex"8e4dd183671732d8cda6aafc4b2cd7fcb9e9f59e4564da04e0eb0616b7e15ec10f1dd7b4789474215ca1d1be78cde0e3"
        });

    function setUp() public {
        sharable = new EncryptedSharable();
        vm.deal(dataCreator, 100 ether);
    }

    function create() public {
        EncryptedSharable.EncryptionKey[]
            memory keys = new EncryptedSharable.EncryptionKey[](1);
        keys[0] = testKey1;

        vm.prank(dataCreator);
        sharable.create(dataData, keys, userData);
    }

    function testCreate() public {
        create();

        assertEq(sharable.dataCount(), 1);
        (address addr, bytes memory d, bytes memory userData) = sharable.data(
            0
        );
        assertEq(addr, dataCreator);
        assertEq(d, dataData);
        assertEq(userData, userData);

        EncryptedSharable.Data memory data = sharable.getData(0);
        assertEq(data.creator, dataCreator);
        assertEq(data.data, dataData);
        assertEq(data.userData, userData);
        assertEq(data.keys.length, 1);
        assertEq(data.keys[0].person, testKey1.person);
        assertEq(data.keys[0].nonce, testKey1.nonce);
        assertEq(data.keys[0].ephemeralPublicKey, testKey1.ephemeralPublicKey);
    }

    function testAddKey() public {
        // test negative cases

        // test when the data does not exist we revert
        vm.expectRevert(EncryptedSharable.DataNotFound.selector);
        sharable.addKey(0, testKey2);

        create();

        // shouldnt be able to addKey unless we are the creator
        vm.expectRevert(EncryptedSharable.Unauthorized.selector);
        sharable.addKey(0, testKey2);

        vm.prank(dataCreator);
        sharable.addKey(0, testKey2);

        EncryptedSharable.Data memory data = sharable.getData(0);
        assertEq(data.keys.length, 2);
        assertEq(data.keys[0].person, testKey1.person);
        assertEq(data.keys[0].nonce, testKey1.nonce);
        assertEq(data.keys[0].ephemeralPublicKey, testKey1.ephemeralPublicKey);
        assertEq(data.keys[1].person, testKey2.person);
        assertEq(data.keys[1].nonce, testKey2.nonce);
        assertEq(data.keys[1].ephemeralPublicKey, testKey2.ephemeralPublicKey);
    }
}
