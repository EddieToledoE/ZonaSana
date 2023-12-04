import { Schema, model, models } from "mongoose";

const ProductosRecetadosSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "productos",
      required: [true, "productos obligatorios"]
    },
    instrucciones: {
      type: String,
    }
  },
  {
    _id: false
  }
)

const RecetaSchema = new Schema(
  {
    cita_id: {
        type: Schema.Types.ObjectId,
        ref: 'citas',
        required: [true, "Cita necesaria"],
      },
    observaciones: {
      type: String
    },
    producto_recetado: [ProductosRecetadosSchema],
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default models.receta || model("receta", RecetaSchema);
