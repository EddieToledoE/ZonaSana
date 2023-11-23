import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Cita from "@/models/Cita";

export async function GET() {
  connectarBD();
  try {
    const cantidadCitas = await Cita.countDocuments();
    const cantidadCitasPendientes = await Cita.countDocuments({
      pendiente: true,
    });
    return NextResponse.json({ cantidadCitas, cantidadCitasPendientes });
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return NextResponse.error({
      statusCode: 500,
      message: "Error del servidor",
    });
  }
}
