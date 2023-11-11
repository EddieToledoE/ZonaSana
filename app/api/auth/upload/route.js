import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
export async function POST(request) {
  const data = await request.formData();
  console.log(data);
  const imagen = data.get("archivo");

  if (!imagen) {
    return NextResponse.json("No se ha subido ninguna imagen", { status: 400 });
  }

  const bytes = await imagen.ArrayBuffer();
  const buffer = Buffer.from(bytes);
  const filepath = path.join(process.cwd(), "public", imagen.name);
  await writeFile(filepath, buffer);
  return NextResponse.json("Imagen subida");
}
