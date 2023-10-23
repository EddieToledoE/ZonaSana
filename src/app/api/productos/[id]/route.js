import { conectar } from "@/utils/dbconection";
import { NextResponse } from "next/server";
import Producto from "@/models/Producto";

export async function GET(request, { params }) {
  try {
    conectar();
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

export async function DELETE(request, { params }) {
  try {
    const borrarProducto = await Producto.findByIdAndDelete(params.id);
    if (!borrarProducto)
      return NextResponse.json(
        {
          message: "Ese producto no existe",
        },
        { status: 404 }
      );
    return NextResponse.json(borrarProducto);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const actualizarProducto = await Producto.findByIdAndUpdate(
      params.id,
      data,
      {
        new: true,
      }
    );
    return NextResponse.json(actualizarProducto);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
