import { Schema, model, models } from "mongoose";
const ProductoSchema = new Schema(
  {
    cantidad_stock: {
      type: Number,
      required: [true, "Cantidad necesaria"],
      min: 1,
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
    tipo: {
      type: String,
      required: [true, "Tipo necesario"],
    },
    producto: [
      {
        nombre: {
          type: String,
          required: [true, "Nombre necesario"],
        },
        marca: {
          type: String,
          required: [true, "Marca necesaria"],
        },
        descripcion: {
          type: String,
          required: [true, "Descripcion necesaria"],
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Realiza la validación de precio_costo y precio_venta
ProductoSchema.path("precio_costo").validate(function (value) {
  return value < this.precio_venta;
}, "El precio de costo debe ser menor que el precio de venta");

export default models.productos || model("productos", ProductoSchema);
