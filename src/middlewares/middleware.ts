import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ví dụ: Bỏ qua các route trong (auth) khỏi middleware
  if (pathname.startsWith("/(auth)")) {
    return NextResponse.next();
  }
  // Logic bảo vệ cho các route khác
  const isAuthenticated = true; // Giả sử isAuthenticated là một biến đã được định nghĩa trước
  if (!isAuthenticated) {
    return NextResponse.redirect("/login");
  }

  return NextResponse.next();
}
