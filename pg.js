function generateVerifyToken(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let verifyToken = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    verifyToken += characters.charAt(randomIndex);
  }

  return verifyToken;
}

const verifyToken = generateVerifyToken(16); // Generate a random verify token with a length of 16 characters
console.log(verifyToken);
