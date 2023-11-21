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

    // Obtener la cantidad de productos con menos de 11 en cantidad_stock
    const cantidadConMenosDeOnceStock = await Producto.countDocuments({
      cantidad_stock: { $lt: 11 },
    });

    // Obtener la cantidad de productos con cantidad_stock igual o menor que cantidad_alerta
    const cantidadBajosDeStock = await Producto.countDocuments({
      $expr: { $lte: ["$cantidad_stock", "$cantidad_alerta"] },
    });

    return NextResponse.json({
      cantidadTotal,
      cantidadConCeroStock,
      cantidadConMenosDeOnceStock,
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
