import { conectar } from "@/utils/dbconection";
import { NextResponse } from "next/server";
import Paciente from "@/models/Paciente";

export async function GET(request, { params }) {
  try {
    conectar();
    const encontrarPaciente = await Paciente.findById(params.id);
    if (!encontrarPaciente)
      return NextResponse.json(
        {
          message: "Ese Paciente no existe",
        },
        { status: 404 }
      );
    return NextResponse.json(encontrarPaciente);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const borrarPaciente = await Paciente.findByIdAndDelete(params.id);
    if (!borrarPaciente)
      return NextResponse.json(
        {
          message: "Ese Paciente no existe",
        },
        { status: 404 }
      );
    return NextResponse.json(borrarPaciente);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const actualizarPaciente = await Paciente.findByIdAndUpdate(
      params.id,
      data,
      {
        new: true,
      }
    );
    return NextResponse.json(actualizarPaciente);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
