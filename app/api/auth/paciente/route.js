import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Paciente from "@/models/Paciente";

export async function GET() {
  connectarBD();
  const ObtenerPacientes = await Paciente.find();
  return NextResponse.json(ObtenerPacientes);
}

export async function POST(request) {
  try {
    connectarBD();
    const data = await request.json();
    const CrearPaciente = new Paciente(data);
    console.log(data);
    const GuardarPaciente = await CrearPaciente.save();
    return NextResponse.json(GuardarPaciente);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
