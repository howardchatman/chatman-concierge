import { NextRequest, NextResponse } from "next/server";
import { createVendor, getVendors, updateVendor, deleteVendor, type VendorRecord } from "@/lib/supabase";
import { verifyToken, AUTH_COOKIE_NAME } from "@/lib/auth";

function requireAuth(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(request: NextRequest) {
  try {
    const payload = await requireAuth(request);
    if (!payload) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const category = request.nextUrl.searchParams.get("category") || undefined;
    const data = await getVendors(category);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vendors" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await requireAuth(request);
    if (!payload) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!body.name || !body.email || !body.phone || !body.contact) {
      return NextResponse.json(
        { success: false, error: "Name, contact, email, and phone are required" },
        { status: 400 }
      );
    }

    const vendor: VendorRecord = {
      name: body.name,
      company: body.company || null,
      category: body.category || "other",
      contact: body.contact,
      email: body.email,
      phone: body.phone,
      rating: body.rating || 3,
      notes: body.notes || null,
      license: body.license || null,
      insurance: body.insurance || null,
      address: body.address || null,
      status: body.status || "active",
    };

    const data = await createVendor(vendor);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error creating vendor:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create vendor" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const payload = await requireAuth(request);
    if (!payload) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "Vendor ID is required" },
        { status: 400 }
      );
    }

    const { id, ...updates } = body;
    const data = await updateVendor(id, updates);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error updating vendor:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update vendor" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const payload = await requireAuth(request);
    if (!payload) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Vendor ID is required" },
        { status: 400 }
      );
    }

    await deleteVendor(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete vendor" },
      { status: 500 }
    );
  }
}
