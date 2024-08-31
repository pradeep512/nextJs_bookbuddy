import { NextResponse } from "next/server";
import { verifyJWT } from "./app/lib/utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export function middleware(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyJWT(token);

  if (!decoded) {
    return NextResponse.json(
      { error: "Unauthorized : Invalid token" },
      { status: 401 }
    );
  }
  const user_id = (decoded as JwtPayload).user_id;
  request.headers.set("user_id", user_id);

  return NextResponse.next();
}

export const config = {
  // matcher: "/api/protected/(.*)",
  matcher: "/api/protected/booking",
};
