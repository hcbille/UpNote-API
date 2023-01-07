#!/data/data/com.termux/files/usr/bin/sh

echo "Copying files to .termux/boot/ to make them run at boot"
cp ./boot/start-API ~/.termux/boot/start-API
cp ./boot/start-sshd ~/.termux/boot/start-sshd
chmod +x ~/.termux/boot/start-sshd
chmod +x ~/.termux/boot/start-API

echo "Setting up API-keys"
sleep 1
if [ -f api_keys.js ]; then
  echo "api_keys.js already exists. It will be replaced."
fi
echo "Enter API key:"
read api_key
echo "module.exports = ['$api_key'];" > api_keys.js
echo "API key saved successfully."
