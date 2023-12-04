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

httpServer.listen(3001,() => {
  console.log(
    "Servidor WebSocket escuchando en el puerto 3001 "
  );
});

export default io;
