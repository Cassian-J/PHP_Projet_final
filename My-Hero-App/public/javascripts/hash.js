import { bcrypt } from "https://cdnjs.cloudflare.com/ajax/libs/bcryptjs/2.4.3/bcrypt.min.js";

// Fonction pour hasher un mot de passe
async function hashWithBcrypt(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

// Fonction pour vérifier un mot de passe par rapport à un hash
async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

export { hashWithBcrypt, verifyPassword };
