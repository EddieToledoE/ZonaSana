import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Venta from "@/models/Venta";
import Producto from "@/models/producto";
import io from "@/libs/websocket";
export async function POST(request) {
  try {
    connectarBD();
    const data = await request.json();
    console.log(data);

    const NuevaVenta = new Venta(data);
    const GuardarVenta = await NuevaVenta.save();
    console.log(GuardarVenta);
    io.emit("nueva-venta", GuardarVenta);
    // Actualizar cantidades en productos vendidos
    for (const productoVendido of data.producto_vendido) {
      const producto = await Producto.findById(productoVendido._id);

      if (producto) {
        // Verificar que hay suficiente stock antes de actualizar
        if (producto.cantidad_stock >= productoVendido.cantidad) {
          producto.cantidad_stock -= productoVendido.cantidad;
          await producto.save();
        } else {
          throw new Error(
            `Stock insuficiente para el producto ${producto.nombre}`
          );
        }
      } else {
        throw new Error(`Producto no encontrado con ID ${productoVendido._id}`);
      }
    }

    return NextResponse.json(GuardarVenta);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error.message, { status: 400 });
  }
}

export async function GET() {
  connectarBD();
  const TodaslasVentas = await Venta.find();
  return NextResponse.json(TodaslasVentas);
}
