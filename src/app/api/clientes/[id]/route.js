import { conectar } from "@/utils/dbconection";
import { NextResponse } from "next/server";
import Cliente from "@/models/Cliente";

export async function GET(request, { params }) {
  try {
    conectar();
    const encontrarcliente = await Cliente.findById(params.id);
    if (!encontrarcliente)
      return NextResponse.json(
        {
          message: "Ese cliente no existe",
        },
        { status: 404 }
      );
    return NextResponse.json(encontrarcliente);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const clienteborrado = await Cliente.findByIdAndDelete(params.id);
    if (!clienteborrado)
      return NextResponse.json(
        {
          message: "Ese cliente no existe",
        },
        { status: 404 }
      );
    return NextResponse.json(clienteborrado);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const clienteactualizado = await Cliente.findByIdAndUpdate(
      params.id,
      data,
      {
        new: true,
      }
    );
    return NextResponse.json(clienteactualizado);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
