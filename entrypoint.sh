#!/bin/ash

cleanup() {
  echo "Received SIGTERM signal. Stopping Hardhat network..."
  kill -s INT $HARDHAT_PID
}

trap 'cleanup' TERM

npx hardhat node &
HARDHAT_PID=$!

wait $HARDHAT_PID