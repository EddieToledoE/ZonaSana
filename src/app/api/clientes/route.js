import { conectar } from "@/utils/dbconection";
import { NextResponse } from "next/server";
import Cliente from "@/models/Cliente";

export async function GET() {
  conectar();
  const TodosClientes = await Cliente.find();
  return NextResponse.json(TodosClientes);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const NuevoCliente = new Cliente(data);
    console.log(data);
    const GuardarCliente = await NuevoCliente.save();
    return NextResponse.json(GuardarCliente);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
