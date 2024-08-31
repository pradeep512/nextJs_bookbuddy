import { NextResponse } from "next/server";
import { Book } from "@/app/lib/models/books";

export const GET = async () => {
  try {
    const books = await Book.findAll();
    if (!books || books.length === 0) {
      return NextResponse.json({ error: "books not found" }, { status: 404 });
    }
    return NextResponse.json({ books }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const { auth_id, title, publication_year, genre } = await request.json();
    const newBook = new Book(auth_id, title, publication_year, genre);
    await newBook.save();
    return NextResponse.json(
      { message: "Book created successfully", newBook },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
};
