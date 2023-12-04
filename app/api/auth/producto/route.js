import { NextResponse } from "next/server";
import Producto from "@/models/producto";
import { connectarBD } from "@/libs/mongodb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
export async function POST(request) {
  const data = await request.formData();
  const cantidad_stock = data.get("cantidad_stock");
  const precio_costo = data.get("precio_costo");
  const precio_venta = data.get("precio_venta");
  const categoria = data.get("categoria");
  const marca = data.get("marca");
  const nombre = data.get("nombre");
  const descripcion = data.get("descripcion");
  const imagen = data.get("archivo");
  const cantidad_alerta = data.get("cantidad_alerta");
  console.log(
    cantidad_stock,
    precio_costo,
    precio_venta,
    categoria,
    marca,
    nombre,
    descripcion,
    imagen,
    cantidad_alerta
  );
  console.log(
    "El precio compra es:" +
      precio_costo +
      "El precio venta es: " +
      precio_venta
  );
  if (!imagen) {
    return NextResponse.json("No se ha subido ninguna imagen", { status: 400 });
  }

  try {
    await connectarBD();
    const bytes = await imagen.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const respuesta = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        })
        .end(buffer);
    });

    console.log(respuesta);
    const url = respuesta.secure_url;
    const ProductoEncontrado = await Producto.findOne({ nombre });
    if (ProductoEncontrado)
      return NextResponse.json(
        {
          message: "Ese producto ya esta registrado",
        },
        {
          status: 409,
        }
      );

    const producto = new Producto({
      cantidad_stock,
      precio_costo,
      precio_venta,
      categoria,
      marca,
      nombre,
      descripcion,
      url,
      cantidad_alerta,
    });
    const Productoguardado = await producto.save();
    console.log(Productoguardado);
    return NextResponse.json("Productoguardado");
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export async function GET() {
  connectarBD();
  const TodosProductos = await Producto.find();
  return NextResponse.json(TodosProductos);
}
