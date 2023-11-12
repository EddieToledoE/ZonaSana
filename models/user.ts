import { Schema, model, models } from "mongoose";
const UsuarioSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email necesario"],
            unique: true,
            validate: {
                validator: function (value) {
                    // Aquí definimos una expresión regular para validar el dominio del correo electrónico.
                    // En este caso, permitiremos las direcciones de correo con dominio @gmail.com, @hotmail.com y @outlook.es.
                    const emailPattern = /@(gmail\.com|hotmail\.com|outlook\.es)$/i;
                    return emailPattern.test(value);
                },
                message: "El formato del correo electrónico no es válido.",
            },
        },
        contraseña: {
            type: String,
            required: [true, "Contrasena necesaria"],
            minlength: [8, "La contraseña debe tener al menos 8 caracteres."],
        },
        url: {
            type: String
        },
        persona: [
            {
                nombre: {
                    type: String,
                    required: [true, "Nombre necesario"],
                },
                apellido: {
                    type: String,
                    required: [true, "Apellido necesario"],
                },
                puesto: {
                    type: String,
                    required: [true, "Puesto necesario"],
                },
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default models.usuarios || model("usuarios", UsuarioSchema);
