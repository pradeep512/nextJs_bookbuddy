import { NextResponse } from "next/server";
import { User } from "../../../lib/models/users";

export const GET = async () => {
  try {
    const users = await User.findAll();
    if (!users || users.length === 0) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }
    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
};

// export const PUT = async (request: Request) => {
//   try {
//     const { user_id, email } = await request.json();

//     if (!user_id || !email) {
//       return NextResponse.json(
//         { error: "Missing user_id or email" },
//         { status: 400 }
//       );
//     }

//     const userExists = await User.findById(user_id);
//     if (!userExists || userExists.length === 0) {
//       return NextResponse.json(
//         { error: `User not found with id : ${user_id}` },
//         { status: 404 }
//       );
//     }

//     const result = await User.updateUserEmail(user_id, email);

//     if (result.affectedRows === 0) {
//       return NextResponse.json(
//         { error: "No changes made to the user" },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { message: "User updated successfully", result },
//       { status: 200 }
//     );
//   } catch (err: any) {
//     console.error("Error updating user:", err);

//     if (err.code === "ER_DUP_ENTRY") {
//       return NextResponse.json(
//         { error: "Duplicate entry: The email is already in use." },
//         { status: 409 }
//       );
//     }

//     return NextResponse.json(
//       { error: `Failed to update user: ${err.message}` },
//       { status: 500 }
//     );
//   }
// };
