#!/bin/bash
source .env
source .env.local

forge script script/Deploy.s.sol:Deploy --ffi --chain-id $CHAIN_ID --rpc-url $RPC_URL --broadcast --verify