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
    },
    edad: {
      type: Number,
      required: [true, "Edad necesaria"],
      max: 100,
      min: 0,
    },
    codigo_ajeno: {
      unique: [true, "El codigo debe de ser unico"],
      type: Number,
      max: 9999,
      min: 1000,
    },
    codigo_propio: {
      unique: [true, "El codigo debe de ser unico"],
      type: Number,
      required: [true, "Codigo necesario"],
      max: 9999,
      min: 1000,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default models.pacientes || model("pacientes", PacienteSchema);
