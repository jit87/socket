import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

//Instancia de la aplicación de Express
const app = express();

//Creación del servidor http
const httpServer = createServer(app);

//Creamos el socket que correrá en httpServer
const io = new Server(httpServer, {
    cors: { origin: "*" }
});

const port = 4000;

//Emite por consola un mensaje cada vez que un usuario se conecta
io.on("connection", (socket) => {
    console.log("usuario conectado");

    //Emite por consola un mensaje cada vez que se recibe un mensaje
    socket.on("mensaje", (mensage) => {
        console.log("Mensaje recibido:", mensage);
        io.emit("mensaje", mensage);
    });

    //Emite por consola un mensaje cada vez que un usuario se desconecta
    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });
});

//Ponemos a correr el servidor http
httpServer.listen(port, () => {
    console.log(`Servidor corriendo en ${port}`);
});
