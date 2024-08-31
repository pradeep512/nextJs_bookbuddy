import { NextResponse } from "next/server";
import { User } from "@/app/lib/models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  try {
    const { username, password } = await request.json();
    const user = await User.findByUsername(username);
    if (!user || user.length === 0) {
      return NextResponse.json(
        { error: "Invalid username or password!" },
        { status: 401 }
      );
    }
    const userDetails = user[0];

    console.log(userDetails);

    const isPasswordValid = await bcrypt.compare(
      password,
      userDetails.password
    );

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password!" }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in the environment variables.");
    }

    const token = jwt.sign(
      { user_id: userDetails.user_id, role_id: userDetails.role_id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ error: "Login failed", status: 500 });
  }
};
