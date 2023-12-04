import { NextResponse } from "next/server";
import Usuario from "@/models/user";
import bcrypt from "bcryptjs";
import { connectarBD } from "@/libs/mongodb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dwjnodqln",
  api_key: "857757943571861",
  api_secret: "wC8CXXYYJYWX7d-naEL2L3UEg8k",
});
export async function POST(request) {
  const { email, contraseña, persona, url } = await request.json();
  console.log(email, contraseña, persona, url);

  if (!contraseña || contraseña.length < 8)
    return NextResponse.json(
      {
        message: "La contraseña debe tener al menos 8 caracteres",
      },
      {
        status: 400,
      }
    );

  try {
    await connectarBD();
    const UsuarioEncontrado = await Usuario.findOne({ email });
    if (UsuarioEncontrado)
      return NextResponse.json(
        {
          message: "Ese usuario ya existe",
        },
        {
          status: 409,
        }
      );

    const contracifrada = await bcrypt.hash(contraseña, 12);
    const user = new Usuario({
      email: email,
      contraseña: contracifrada,
      persona: persona,
      url: url,
    });
    const usuarioguardado = await user.save();
    console.log(usuarioguardado);
    return NextResponse.json(usuarioguardado);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
