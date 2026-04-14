import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const countryHeader = request.headers.get("x-vercel-ip-country");
  const country = countryHeader || "TR";

  return NextResponse.json({ country });
}
