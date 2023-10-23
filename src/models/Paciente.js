import { Schema, model, models } from "mongoose";
const PacienteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "Nombre necesario"],
    },
    apellido: {
      type: String,
      required: [true, "Apellido necesario"],
    },
    telefono: {
      type: Number,
      required: [true, "Telefono necesario"],
      max: 9999999999,
      min: 1000000000,
    },
    edad: {
      type: Number,
      required: [true, "Edad necesaria"],
      max: 100,
      min: 0,
    },
    codigo_ajeno: {
      type: Number,
      required: [false, "Codigo no necesario"],
      max: 9999,
      min: 1000,
    },
    codigo_propio: {
      type: Number,
      required: [true, "Codigo necesario"],
      max: 9999,
      min: 1000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.pacientes || model("pacientes", PacienteSchema);
