import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Receta from "@/models/Receta";
import Cita from "@/models/Cita";
import Paciente from "@/models/Paciente";
import { Schema, model, models } from "mongoose";


export async function GET(request, { params }) {
  connectarBD();
  try {
    
    const ObtenerRecetas = await Receta.find()
    .populate({
      path: "cita_id",
      model: "cita",
      populate: {
        path: "paciente_id",
        model: "pacientes",
        select: "nombre apellido edad",
      },
    });
    console.log(ObtenerRecetas);

    const pacienteIdDeseado = params.id;
    const recetaIdDeseado = params.id2;

    const recetasFiltradas = ObtenerRecetas.filter((receta) => {
      return receta.cita_id.paciente_id === pacienteIdDeseado;
    });

    const recetaEncontrada = ObtenerRecetas.filter((receta) => {
      return receta._id.toString() === recetaIdDeseado;
    });

    return NextResponse.json(recetaEncontrada);
  } catch (error) {
    console.error("Error al obtener recetas:", error);
    return NextResponse.error({
      statusCode: 500,
      message: "Error del servidor",
    });
  }
}