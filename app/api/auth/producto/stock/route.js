import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Producto from "@/models/producto";

export async function GET() {
  connectarBD();
  try {
    const disponibles = await Producto.find({ cantidad_stock: { $gt: 0 } });
    return NextResponse.json(disponibles);
  } catch (error) {
    console.error("Error al obtener estadísticas de productos:", error);
    return NextResponse.error({
      statusCode: 500,
      message: "Error del servidor",
    });
  }
}
