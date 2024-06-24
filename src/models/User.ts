import db from "../db";
import bcrypt from "bcrypt";

interface UserConstructor {
  username: string;
  fullname?: string;
  password: string;
}

class User {
  private username: string;
  private fullname?: string;
  private password: string;
  constructor({ username, fullname, password }: UserConstructor) {
    this.username = username;
    this.fullname = fullname;
    this.password = password;
  }

  async save() {
    try {
      const { error, data: userData } = await db
        .from("auth_users")
        .insert([
          {
            username: this.username,
            fullname: this.fullname,
            password: this.password,
          },
        ])
        .select()
        .single();
      if (error) throw error;

      return userData;
    } catch (err: any) {
      throw err;
    }
  }

  static async getAllUsers() {
    try {
      const { data, error } = await db.from("auth_users").select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error("Error fetching users");
    }
  }

  static async getUserByUsername(username: string) {
    try {
      const { data, error } = await db
        .from("auth_users")
        .select("*")
        .eq("username", username)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error("Error fetching user by username");
    }
  }
  static async verifyPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export { User, UserConstructor };
