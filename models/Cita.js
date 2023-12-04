import { Schema, model, models } from "mongoose";
const CitaSchema = new Schema(
  {
    paciente_id: {
        type: Schema.Types.ObjectId,
        ref: 'pacientes',
        required: [true, "Paciente necesario"],
      },
    fecha: {
      type: Date,
      required: [true, "Fecha necesaria"],
      min: 1,
    },
    pendiente: {
      type: Boolean,
      required: [true, "Dato necesario"],
    }
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default models.cita || model("cita", CitaSchema);
