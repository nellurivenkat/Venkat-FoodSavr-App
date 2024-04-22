const generateCode = () => {
  const random = Math.floor(Math.random() * 9000) + 1000;
  return random.toString();
};

module.exports = { generateCode };
