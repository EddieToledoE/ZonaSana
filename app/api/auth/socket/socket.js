const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Conexión a MongoDB usando Mongoose
mongoose.connect('URL_de_conexión_a_tu_DB', { useNewUrlParser: true, useUnifiedTopology: true });

// Lógica para escuchar cambios en tu base de datos
const tuModelo = require('./ruta/hacia/tu/modelo');

tuModelo.watch().on('change', (change) => {
  if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
    io.emit('cambio', change); // Envía una notificación a todos los clientes conectados cuando hay un cambio en la base de datos
  }
});

// Lógica para manejar conexiones de Socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = 3001; // Puerto en el que se ejecutará tu servidor Socket.io
server.listen(PORT, () => {
  console.log(`Servidor Socket.io escuchando en el puerto ${PORT}`);
});