import { conectar } from "@/utils/dbconection";
import { NextResponse } from "next/server";
import Paciente from "@/models/Paciente";

export async function GET() {
  conectar();
  const ObtenerPacientes = await Paciente.find();
  return NextResponse.json(ObtenerPacientes);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const CrearPaciente = new Paciente(data);
    console.log(data);
    const GuardarPaciente = await CrearPaciente.save();
    return NextResponse.json(GuardarPaciente);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
