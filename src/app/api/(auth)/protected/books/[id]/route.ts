import { NextResponse } from "next/server";
import { Book } from "../../../../../lib/models/books";

export const GET = async (
  request: Request,
  context: { params: { id?: number } }
) => {
  const { params } = context;

  if (!params || !params.id) {
    return NextResponse.json({ error: "ID not provided" }, { status: 400 });
  }

  try {
    if (isNaN(params.id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const book = await Book.findById(params.id);

    if (book) {
      return NextResponse.json({ book }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: `Book not found with id : ${params.id}` },
        { status: 404 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const { id } = params;
    const { auth_id, title, publication_year, genre } = await request.json();

    if (!auth_id || !title || !publication_year || !genre) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const bookExists = await Book.findById(id);
    if (!bookExists) {
      return NextResponse.json(
        { error: `Book not found with id : ${id}` },
        { status: 404 }
      );
    }
    const updatedBook = new Book(auth_id, title, publication_year, genre);
    const result = await Book.update(id, updatedBook);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "No changes made to the book" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Book updated successfully", result },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const { id } = params;

    const bookExists = await Book.findById(id);
    if (!bookExists) {
      return NextResponse.json(
        { error: `Book not found with id : ${id}` },
        { status: 404 }
      );
    }
    const result = await Book.delete(id);

    return NextResponse.json(
      { message: "Book deleted successfully", result },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
};
