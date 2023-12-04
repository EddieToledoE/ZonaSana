import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Receta from "@/models/Receta";
import Cita from "@/models/Cita";
import { Schema, model, models } from "mongoose";

export async function GET(request, { params }) {
  connectarBD();
  try {
    const pacienteIdDeseado = params.id;

    const ObtenerRecetas = await Receta.find({ 'cita_id.paciente_id': pacienteIdDeseado })
      .populate("cita_id", "paciente_id fecha", Cita);

    const recetasConConteo = ObtenerRecetas.map((receta) => {
      return {
        _id: receta._id,
        cita_id: receta.cita_id,
        observaciones: receta.observaciones,
        producto_recetado: receta.producto_recetado,
        cantidadProductos: receta.producto_recetado.length, // Agregar el conteo de productos
      };
    });

    return NextResponse.json(recetasConConteo);
  } catch (error) {
    console.error("Error al obtener recetas:", error);
    return NextResponse.error({
      statusCode: 500,
      message: "Error del servidor",
    });
  }
}
