import { Schema, model, models, mongoose } from "mongoose";

const ProductoVendidoSchema = new Schema(
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
    ganancia: {
      type: Number,
      require: [true, "ganancia necesario"],
    },
    monto: {
      type: Number,
      required: [true, "monto necesario"],
    },
  },
  {
    _id: false, // Evita que se genere automáticamente un campo _id para cada elemento en el array
  }
);

const VentaSchema = new Schema(
  {
    usuario: {
      type: String,
      required: [true, "usuario necesario"],
    },
    nombre: {
      type: String,
      required: [true, "nombre necesario"],
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    monto: {
      type: Number,
      required: [true, "monto necesario"],
    },
    ganancia: {
      type: Number,
      required: [true, "ganancia necesaria"],
    },
    producto_vendido: [ProductoVendidoSchema], // Usa el subesquema definido arriba
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default models.ventas || model("ventas", VentaSchema);
