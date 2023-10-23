import { conectar } from "@/utils/dbconection";
import { NextResponse } from "next/server";
import Usuario from "@/models/Usuario";

export async function GET() {
  conectar();
  const ObtenerUsuarios = await Usuario.find();
  return NextResponse.json(ObtenerUsuarios);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const NuevoUsuario = new Usuario(data);
    console.log(data);
    const GuardarUsuario = await NuevoUsuario.save();
    return NextResponse.json(GuardarUsuario);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
