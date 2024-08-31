import { User } from "@/app/lib/models/users";
import { NextResponse } from "next/server";

export const POST = async (request: Request, response: NextResponse) => {
  try {
    const { username, password, role_id } = await request.json();
    const newUser = new User(username, password, role_id);

    const result = await newUser.save();
    return NextResponse.json(
      { message: "User created successfully", newUser },
      { status: 201 }
    );
  } catch (err: any) {
    console.log(err);
    if (err.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "Username is taken" }, { status: 409 });
    }
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
};
