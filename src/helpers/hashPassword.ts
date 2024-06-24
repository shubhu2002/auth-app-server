import bcrypt from "bcrypt";

const hashedPassword = async (password: string) => {
  try {
    const salt: number = 10;
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Hashing Failed");
  }
};

export default hashedPassword;
