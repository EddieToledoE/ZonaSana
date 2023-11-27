import { Schema, model, models } from "mongoose";
const ProductoSchema = new Schema(
  {
    cantidad_stock: {
      type: Number,
      required: [true, "Cantidad necesaria"],
      min: 0,
    },
    cantidad_alerta: {
      type: Number,
      required: [true, "Cantidad necesaria"],
      min: 3,
    },
    precio_costo: {
      type: Number,
      required: [true, "El costo es necesario"],
      min: 1,
    },
    precio_venta: {
      type: Number,
      required: [true, "El precio es necesario"],
      min: 1,
    },
    categoria: {
      type: String,
      required: [true, "Categoria necesario"],
    },
    marca: {
      type: String,
      required: [true, "Marca necesario"],
    },
    nombre: {
      unique: [true, "No hay nombres repetidos"],
      type: String,
      required: [true, "Nombre necesario"],
    },
    descripcion: {
      type: String,
      required: [false, "Descripcion necesaria"],
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default models.productos || model("productos", ProductoSchema);
