import { connectarBD } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Cliente from "@/models/Cliente";

export async function GET() {
  connectarBD();
  const TodosClientes = await Cliente.find();
  return NextResponse.json(TodosClientes);
}

export async function POST(request) {
  try {
    connectarBD();
    const data = await request.json();
    console.log(data);
    const NuevoCliente = new Cliente(data);
    const GuardarCliente = await NuevoCliente.save();
    return NextResponse.json(GuardarCliente);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
