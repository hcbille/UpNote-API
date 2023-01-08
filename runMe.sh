#!/data/data/com.termux/files/usr/bin/bash
echo "Stopping Service"
pkill node
sleep 1
echo "Starting Service"
node api.js &
