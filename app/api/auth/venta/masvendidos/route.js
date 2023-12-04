import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Venta from "@/models/Venta";
import Producto from "@/models/producto";

export async function GET() {
  connectarBD();
  try {
    // Agrupar y sumar la cantidad de productos vendidos
    const productosMasVendidos = await Venta.aggregate([
      { $unwind: "$producto_vendido" },
      {
        $group: {
          _id: "$producto_vendido._id",
          totalVendido: { $sum: "$producto_vendido.cantidad" },
        },
      },
      { $sort: { totalVendido: -1 } },
      { $limit: 6 },
    ]);

    // Obtener detalles de los productos más vendidos
    const detallesProductos = await Promise.all(
      productosMasVendidos.map(async (productoVendido) => {
        const producto = await Producto.findById(productoVendido._id);
        return {
          _id: productoVendido._id,
          nombre: producto.nombre,
          totalVendido: productoVendido.totalVendido,
          url: producto.url,
          // Otros detalles del producto que puedas necesitar
        };
      })
    );

    return NextResponse.json(detallesProductos);
  } catch (error) {
    console.error("Error al obtener productos más vendidos:", error);
    return NextResponse.error({
      statusCode: 500,
      message: "Error del servidor",
    });
  }
}
