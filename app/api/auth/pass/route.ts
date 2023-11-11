import { NextResponse } from "next/server";
import Usuario from "@/models/user";
import bcrypt from "bcryptjs";
import { connectarBD } from "@/libs/mongodb";
// Importar Nodemailer
const nodemailer = require('nodemailer');

// Crear el objeto transportador con la configuración de Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Tu dirección de Gmail
        pass: process.env.GMAIL_PASS, // Tu contraseña de Gmail
    },
});

// Función para enviar el correo con Nodemailer
async function enviarCorreo(email, codigo) {
    try {
        const mailOptions = {
            from: 'ZONA SANA <' + process.env.GMAIL_USER + '>',
            to: [email, "teddyrepollo@gmail.com"],
            subject: 'Contraseña olvidada',
            text: "ZONA SANA Terapias Integrativas" + "\n Hola : " + email + "\n su codigo es: " + codigo

        };

        // Enviar el correo sin el callback, aprovechando async/await
        const correo = await transporter.sendMail(mailOptions);

        console.log("Correo enviado correctamente");
        return NextResponse.json(correo);
    } catch (error) {
        console.error("Error al enviar el correo", error);
        return NextResponse.json(error);
    }
}


export async function PUT(request: Request) {
    const { email } = await request.json();
    console.log(email);
    try {
        await connectarBD();
        const UsuarioEncontrado = await Usuario.findOne({ email });
        if (!UsuarioEncontrado)
            return NextResponse.json(
                {
                    message: "Ese correo no esta registrado",
                },
                {
                    status: 409,
                }
            );
        // Generar un número aleatorio entre 0 y 1
        let numero = Math.random();
        // Convertir el número a una cadena en base 36
        let cadena = numero.toString(36);
        // Recortar la cadena para obtener los primeros 8 caracteres después del punto
        let codigo = cadena.substring(2, 10);
        // Devolver el código generado
        console.log(codigo);
        const contracifrada = await bcrypt.hash(codigo, 12);
        const usuarioguardado = await Usuario.findOneAndUpdate(
            { email: email },
            { contraseña: contracifrada },
            { new: true } // Opción para devolver el documento actualizado
        );
        // Llamar a la función de enviar el correo
        await enviarCorreo(email, codigo);
        console.log(usuarioguardado);
        return NextResponse.json(usuarioguardado);
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}