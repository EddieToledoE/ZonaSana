import { Schema, model, models, mongoose } from "mongoose";

const ProductoEnviadoSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productos",
      required: [true, "producto obligatorio"],
    },
    cantidad: {
      type: Number,
      min: 1,
    },
  },
  {
    _id: false, // Evita que se genere automáticamente un campo _id para cada elemento en el array
  }
);

const EnvioSchema = new Schema(
  {
    rastreo: {
      type: Number,
    },
    valor: {
      type: Number,
      required: [true, "monto necesario"],
    },
    fecha: {
      type: String,
      required: [true, "fecha necesaria"],
    },
    estatus: {
      type: String,
      required: [true, "estatus necesario"],
    },
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clientes",
      required: [true, "cliente obligatorio"],
    },
    producto_enviado: [ProductoEnviadoSchema], // Usa el subesquema definido arriba
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default models.envios || model("envios", EnvioSchema);
