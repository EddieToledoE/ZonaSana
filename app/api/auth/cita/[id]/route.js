import { NextResponse } from "next/server";
import Cita from "@/models/Cita";
import { connectarBD } from "@/libs/mongodb";

export async function DELETE(request, { params }) {
  try {
    connectarBD();
    const borrarCita = await Cita.findByIdAndDelete(params.id);
    if (!borrarCita)
      return NextResponse.json(
        {
          message: "Ese Cita no existe",
        },
        { status: 404 }
      );
    return NextResponse.json(borrarCita);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const actualizarCita = await Cita.findByIdAndUpdate(
      params.id,
      { pendiente: data.pendiente },
      {
        new: true,
      }
    );
    return NextResponse.json(actualizarCita);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
