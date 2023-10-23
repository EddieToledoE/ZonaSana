import { NextResponse } from "next/server";
import { conectar } from "@/utils/dbconection";

export function GET() {
  conectar();
  return NextResponse.json({
    message: "Holaaa",
  });
}
