import { NextRequest, NextResponse } from "next/server";
import { uploadPropertyPhoto } from "@/lib/supabase";
import { verifyToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Require auth
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File must be under 10MB" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const url = await uploadPropertyPhoto(buffer, file.name);

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Error uploading photo:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload photo" },
      { status: 500 }
    );
  }
}
