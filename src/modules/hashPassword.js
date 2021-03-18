import * as Crypto from 'expo-crypto';

// HASH password
const hashPassword = async (password) => {
    try {
        const digest = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            password
        );
        return digest;
    } catch (error) {
        alert(error.message);
        return '';
    }
}
export { hashPassword }
