import { conectar } from "@/utils/dbconection";
import { NextResponse } from "next/server";
import Producto from "@/models/Producto";

export async function GET() {
  conectar();
  const ObtenerProductos = await Producto.find();
  return NextResponse.json(ObtenerProductos);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const NuevoProducto = new Producto(data);
    console.log(data);
    const GuardarProducto = await NuevoProducto.save();
    return NextResponse.json(GuardarProducto);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
