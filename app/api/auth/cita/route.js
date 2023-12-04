import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Cita from "@/models/Cita";

export async function GET() {
  connectarBD();
  try {
    const ObtenerCitas = await Cita.find()
    .populate("paciente_id", "nombre apellido telefono edad")
    console.log(ObtenerCitas);
    return NextResponse.json(ObtenerCitas);
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return NextResponse.error({
      statusCode: 500,
      message: "Error del servidor",
    });
  }
}

export async function POST(request) {
  try {
    connectarBD();
    const data = await request.json();
    const CrearCitas = new Cita(data);
    console.log(data);
    const GuardarCitas = await CrearCitas.save();
    console.log("Guardado correctamente")
    return NextResponse.json(GuardarCitas);
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(error.message, { status: 400 });
  }
}
