import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ví dụ: Bỏ qua các route trong (auth) khỏi middleware
  if (pathname.startsWith("/(auth)")) {
    return NextResponse.next();
  }

  // Kiểm tra xem người dùng đã đăng nhập chưa
  const token = request.cookies.get("token"); // Hoặc kiểm tra localStorage nếu cần

  if (!token) {
    // Nếu không có token, chuyển hướng đến trang đăng nhập
    return NextResponse.redirect(new URL("/(auth)/login", request.url));
  }

  return NextResponse.next();
}
