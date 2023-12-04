import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Cita from "@/models/Cita";

export async function GET() {
  connectarBD();
  try {
    const ObtenerCitas = await Cita.find({ pendiente: true })
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