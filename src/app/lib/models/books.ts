import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../db";

export class Book {
  auth_id: number;
  title: string;
  publication_year: number;
  genre: string;
  constructor(
    auth_id: number,
    title: string,
    publication_year: number,
    genre: string
  ) {
    this.auth_id = auth_id;
    this.title = title;
    this.publication_year = publication_year;
    this.genre = genre;
  }

  async save() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const createdAtDate = `${year}-${month}-${day}`;

    const sql = `INSERT INTO books(auth_id,title,publication_year,genre,created_at) VALUES(?,?,?,?,?)`;

    try {
      const [result] = await pool.execute(sql, [
        this.auth_id,
        this.title,
        this.publication_year,
        this.genre,
        createdAtDate,
      ]);
      return result;
    } catch (error: any) {
      throw new Error(`Error creating book: ${error}`);
    }
  }

  static async findAll(): Promise<RowDataPacket[]> {
    const sql = `SELECT * FROM books`;
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(sql);
      return rows;
    } catch (error: any) {
      throw new Error(`Error fetching books: ${error}`);
    }
  }

  static async findById(id: number): Promise<RowDataPacket[]> {
    const sql = `SELECT * FROM books WHERE id=?`;

    try {
      const [row] = await pool.execute<RowDataPacket[]>(sql, [id]);
      return row;
    } catch (error: any) {
      throw new Error(`Error fetching book by id: ${error}`);
    }
  }

  static async update(id: number, updatedBook: Book): Promise<ResultSetHeader> {
    const sql = `UPDATE books SET auth_id=?, title=?, publication_year=?, genre=? WHERE id=?`;
    try {
      const [result] = await pool.execute<ResultSetHeader>(sql, [
        updatedBook.auth_id,
        updatedBook.title,
        updatedBook.publication_year,
        updatedBook.genre,
        id,
      ]);
      return result;
    } catch (error: any) {
      throw new Error(`Error updating bopk by id: ${error}`);
    }
  }

  static async delete(id: number) {
    const sql = `DELETE FROM books WHERE id=?`;
    try {
      const result = await pool.execute(sql, [id]);
      return result;
    } catch (error: any) {
      throw new Error(`Error deleting user by id: ${error}`);
    }
  }
}
