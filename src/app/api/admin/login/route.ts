import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  const password = payload?.password;
  const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (password === expectedPassword) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
