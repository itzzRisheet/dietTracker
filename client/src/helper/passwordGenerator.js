const generate = (length) => {
  var password = "";
  const sp = "!@#$%^&*()";
  const nm = "0123456789";
  const low = "abcdefghijklmnopqrstuvwxyz";
  const upp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charset =
    "!@#$%^&*()0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  password += sp.charAt(Math.floor(Math.random() * sp.length));
  password += nm.charAt(Math.floor(Math.random() * nm.length));
  password += low.charAt(Math.floor(Math.random() * low.length));
  password += upp.charAt(Math.floor(Math.random() * upp.length));

  for (let i = 0; i < length - 4; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

export default generate;
