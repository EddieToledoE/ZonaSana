import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado", socket.id);
});

httpServer.listen(() => {
  console.log(
    "Servidor WebSocket escuchando en el puerto asignado automaticamente"
  );
});

export default io;
