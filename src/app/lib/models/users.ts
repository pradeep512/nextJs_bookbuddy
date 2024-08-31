import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../db";
import bcrypt from "bcryptjs";

export class User {
  username: string;
  password: string;
  role_id: number;
  constructor(username: string, password: string, role_id: number) {
    this.username = username;
    this.password = password;
    this.role_id = role_id;
  }

  async save() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const createdAtDate = `${year}-${month}-${day}`;

    const hashedPassword = await bcrypt.hash(this.password, 10);

    const sql = `INSERT INTO users(username, password, role_id, created_at) VALUES(?,?,?,?)`;

    try {
      const [result] = await pool.execute(sql, [
        this.username,
        hashedPassword,
        this.role_id,
        createdAtDate,
      ]);
      return result;
    } catch (error: any) {
      throw { code: error.code, message: error.message };
    }
  }

  static async findAll(): Promise<RowDataPacket[]> {
    const sql = `SELECT * FROM users`;
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(sql);
      return rows;
    } catch (error: any) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  static async findById(user_id: number): Promise<RowDataPacket[]> {
    const sql = `SELECT * FROM users WHERE user_id=?`;

    try {
      const [row] = await pool.execute<RowDataPacket[]>(sql, [user_id]);
      return row;
    } catch (error: any) {
      throw { code: error.code, message: error.message };
    }
  }

  static async findByUsername(username: string): Promise<RowDataPacket[]> {
    const sql = `SELECT * FROM users WHERE username=?`;
    try {
      const [row] = await pool.execute<RowDataPacket[]>(sql, [username]);
      return row;
    } catch (error: any) {
      throw { code: error.code, message: error.message };
    }
  }

  //   static async updateUserEmail(
  //     user_id: number,
  //     email: string
  //   ): Promise<ResultSetHeader> {
  //     const sql = `UPDATE users SET email=? WHERE user_id=?`;

  //     try {
  //       const [result] = await pool.execute<ResultSetHeader>(sql, [
  //         email,
  //         user_id,
  //       ]);
  //       return result;
  //     } catch (error: any) {
  //       throw { code: error.code, message: error.message };
  //     }
  //   }
}
