import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Producto from "@/models/producto";
export async function GET() {
  connectarBD();

  try {
    // Obtener la cantidad total de productos
    const cantidadTotal = await Producto.countDocuments();

    // Obtener la cantidad de productos con 0 en cantidad_stock
    const cantidadConCeroStock = await Producto.countDocuments({
      cantidad_stock: 0,
    });

    // Obtener la cantidad de productos con cantidad_stock igual o menor que cantidad_alerta
    const cantidadBajosDeStock = await Producto.find({
      $expr: { $lte: ["$cantidad_stock", "$cantidad_alerta"] },
    }).limit(3);

    return NextResponse.json({
      cantidadTotal,
      cantidadConCeroStock,
      cantidadBajosDeStock,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas de productos:", error);
    return NextResponse.error({
      statusCode: 500,
      message: "Error del servidor",
    });
  }
}
