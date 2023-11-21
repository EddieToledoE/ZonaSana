import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Envio from "@/models/Envio";
export async function GET() {
  connectarBD();

  try {
    const cantidadTotal = await Envio.countDocuments();
    const cantidadEntregados = await Envio.countDocuments({
      estatus: "Entregado",
    });
    const cantidadNoEntregados = cantidadTotal - cantidadEntregados;

    return NextResponse.json({
      cantidadTotal,
      cantidadEntregados,
      cantidadNoEntregados,
    });
  } catch (error) {
    console.error("Error al obtener cantidades de envíos:", error);
    return NextResponse.error({
      statusCode: 500,
      message: "Error del servidor",
    });
  }
}
