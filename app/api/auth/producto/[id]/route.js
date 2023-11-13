import { NextResponse } from "next/server";
import Producto from "@/models/producto";
import { connectarBD } from "@/libs/mongodb";

export async function GET(request, { params }) {
  try {
    connectarBD();
    const encontrarProducto = await Producto.findById(params.id);
    if (!encontrarProducto)
      return NextResponse.json(
        {
          message: "Ese producto no existe",
        },
        { status: 404 }
      );
    return NextResponse.json(encontrarProducto);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
