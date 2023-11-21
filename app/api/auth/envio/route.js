import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Envio from "@/models/Envio";

export async function GET() {
  connectarBD();

  try {
    const ObtenerEnvios = await Envio.find()
      .populate("cliente", "nombre") // Poblar el campo 'cliente' y seleccionar solo 'nombre' y 'apellido'
      .populate("producto_enviado._id", "nombre"); // Poblar el campo 'producto_enviado.producto' y seleccionar solo 'nombre'

    console.log(ObtenerEnvios);
    return NextResponse.json(ObtenerEnvios);
  } catch (error) {
    console.error("Error al obtener envíos:", error);
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
    console.log(data);
    const NuevoEnvio = new Envio(data);
    const GuardarEnvio = await NuevoEnvio.save();
    console.log(GuardarEnvio);
    return NextResponse.json(GuardarEnvio);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
