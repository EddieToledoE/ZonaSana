import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export async function conectar() {
  if (conn.isConnected) return;
  const db = await connect(process.env.MONGO_URI);
  console.log(db.connection.db.databaseName);
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => {
  console.log("Mongoose conectado");
});

connection.on("error", (err) => {
  console.log("Mongoose error", err);
});
