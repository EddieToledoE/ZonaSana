import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Receta from "@/models/Receta";
import Cita from "@/models/Cita";
import { Schema, model, models } from "mongoose";

export async function GET(request, { params }) {
  connectarBD();
  try {
    const ObtenerRecetas = await Receta.find()
      .populate("producto_recetado._id", "nombre", Receta)
      .populate("cita_id", "paciente_id", Cita) // Poblar el campo 'producto_enviado.producto' y seleccionar solo 'nombre'
    console.log(ObtenerRecetas);
    const pacienteIdDeseado = params.id;
    const recetasFiltradas = ObtenerRecetas.filter((receta) => {
      return receta.cita_id.paciente_id === pacienteIdDeseado;
    });
    return NextResponse.json(ObtenerRecetas);
  } catch (error) {
    console.error("Error al obtener recetas:", error);
    return NextResponse.error({
      statusCode: 500,
      message: "Error del servidor",
    });
  }
}

export async function POST(request) {
  try {
    connectarBD();
    const data = await request.json();
    console.log(data);
    const NuevaReceta = new Receta(data);
    const GuardarReceta = await NuevaReceta.save();
    console.log(GuardarReceta);
    return NextResponse.json(GuardarReceta);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
