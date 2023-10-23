import { conectar } from "@/utils/dbconection";
import { NextResponse } from "next/server";
import Usuario from "@/models/Usuario";

export async function GET(request, { params }) {
  try {
    conectar();
    const encontrarUsuario = await Usuario.findById(params.id);
    if (!encontrarUsuario)
      return NextResponse.json(
        {
          message: "Ese usuario no existe",
        },
        { status: 404 }
      );
    return NextResponse.json(encontrarUsuario);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const borrarUsuario = await Usuario.findByIdAndDelete(params.id);
    if (!borrarUsuario)
      return NextResponse.json(
        {
          message: "Ese usuario no existe",
        },
        { status: 404 }
      );
    return NextResponse.json(borrarUsuario);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const actualizarUsuario = await Usuario.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(actualizarUsuario);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
