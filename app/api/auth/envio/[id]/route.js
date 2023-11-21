import { NextResponse } from "next/server";
import Envio from "@/models/Envio";
import { connectarBD } from "@/libs/mongodb";

export async function GET(request, { params }) {
  try {
    connectarBD();
    const encontrarEnvio = await Envio.findById(params.id)
      .populate("cliente", "nombre apellido telefono direccion")
      .populate("producto_enviado._id", "nombre marca url");
    if (!encontrarEnvio)
      return NextResponse.json(
        {
          message: "Ese producto no existe",
        },
        { status: 404 }
      );
    console.log(encontrarEnvio);
    return NextResponse.json(encontrarEnvio);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    connectarBD();
    const borrarEnvio = await Envio.findByIdAndDelete(params.id);
    if (!borrarEnvio)
      return NextResponse.json(
        {
          message: "Ese producto no existe",
        },
        { status: 404 }
      );
    return NextResponse.json(borrarEnvio);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const actualizarEnvio = await Envio.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(actualizarEnvio);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
