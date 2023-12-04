import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Evento from "@/models/Evento";

export async function GET() {
  connectarBD();
  const ObtenerEventos = await Evento.find();
  return NextResponse.json(ObtenerEventos);
}

export async function POST(request) {
  try {
    connectarBD();
    const data = await request.json();
    const CrearEvento = new Evento(data);
    console.log(data);
    const GuardarEvento = await CrearEvento.save();
    return NextResponse.json(GuardarEvento);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
