import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Venta from "@/models/Venta";

export async function POST(request) {
  try {
    connectarBD();
    const data = await request.json();
    console.log(data);
    const NuevaVenta = new Venta(data);
    const GuardarVenta = await NuevaVenta.save();
    console.log(GuardarVenta);
    return NextResponse.json(GuardarVenta);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error.message, { status: 400 });
  }
}

export async function GET() {
  connectarBD();
  const TodaslasVentas = await Venta.find();
  return NextResponse.json(TodaslasVentas);
}
