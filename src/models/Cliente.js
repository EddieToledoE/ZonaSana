import { Schema, model, models } from "mongoose";
const ClienteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
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
    direccion: [
      {
        cp: {
          type: Number,
          required: [true, "Codigo postal requerido"],
          min: 10000,
          max: 99999,
        },

        calle: {
          type: String,
          required: [true, "Calle requerida"],
        },
        municipio: {
          type: String,
          required: [true, "Municipio requerido"],
        },
        estado: {
          type: String,
          required: [true, "Estado requerido"],
        },
        observacion: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.clientes || model("clientes", ClienteSchema);
