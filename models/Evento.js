import { Schema, model, models } from "mongoose";
const EventoSchema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, "Titulo necesario"],
      min: 1,
    },
    descripcion: {
      type: String,
      required: [true, "La descripcion es necesaria"],
      min: 1,
    },
    fecha_inicio: {
      type: Date,
      required: [true, "Fecha de inicio necesaria"],
      min: 1,
    },
    fecha_finalizacion: {
      type: Date,
      required: [true, "Fecha de finalizacion necesaria"],
      min: 1,
    },
    color: {
      type: String,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default models.evento || model("evento", EventoSchema);
