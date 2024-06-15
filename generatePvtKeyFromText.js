const crypto = require('crypto');

function generatePrivateKey(seed, salt) {
    // Combine seed and salt
    const combinedData = seed + salt;

    // Use a cryptographic hash function (SHA-256) to generate a private key
    const hash = crypto.createHash('sha256');
    hash.update(combinedData);

    // Convert hash digest to a hexadecimal string (private key format)
    const privateKey = hash.digest('hex');

    return privateKey;
}

module.exports = { generatePrivateKey };