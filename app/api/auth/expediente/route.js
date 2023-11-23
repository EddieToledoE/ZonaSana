import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Paciente from "@/models/Paciente";
import Cita from "@/models/Cita";
import Receta from "@/models/Receta";

export async function GET() {
  connectarBD();
  try {
    // Realiza una agregación para obtener datos de pacientes y contar sus recetas
    const resultados = await Paciente.aggregate([
      {
        $lookup: {
          from: 'citas',
          localField: '_id',
          foreignField: 'paciente_id',
          as: 'citas',
        },
      },
      {
        $lookup: {
          from: 'recetas',
          localField: 'citas._id',
          foreignField: 'cita_id',
          as: 'recetas',
        },
      },
      {
        $project: {
          _id: 1,
          nombre: 1,
          apellido: 1,
          telefono: 1,
          edad: 1,
          numeroDeRecetas: { $size: '$recetas' }, // Contador de recetas
        },
      },
    ]);

    console.log('Datos de pacientes con contador de recetas:', resultados);

    return NextResponse.json(resultados);
  } catch (error) {
    console.error('Error al obtener datos de pacientes y contador de recetas:', error);
    return NextResponse.error({
      statusCode: 500,
      message: 'Error del servidor',
    });
  }
}


// import { connectarBD } from "@/libs/mongodb";
// import { NextResponse } from "next/server";
// import Receta from "@/models/Receta";
// import Cita from "@/models/Cita";
// export async function GET() {
//   connectarBD();
//   try {
//     const ObtenerExpediente = await Receta.find()
//     .populate("cita_id", "fecha paciente_id", Cita)
//     .populate("producto_recetado._id", "nombre" )
//     console.log(ObtenerExpediente);
//     return NextResponse.json(ObtenerExpediente);
//   } catch (error) {
//     console.error("Error al obtener envíos:", error);
//     return NextResponse.error({
//       statusCode: 500,
//       message: "Error del servidor",
//     });
//   }
// }

// export async function POST(request) {
//   try {
//     connectarBD();
//     const data = await request.json();
//     console.log(data);
//     const NuevoExpediente = new Expediente(data);
//     const GuardarExpediente = await NuevoExpediente.save();
//     console.log(GuardarExpediente);
//     return NextResponse.json(GuardarExpediente);
//   } catch (error) {
//     return NextResponse.json(error.message, { status: 400 });
//   }
// }
