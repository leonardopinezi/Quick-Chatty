const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const path = require("node:path");

const _PORT = 3000;
var connected = 0;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket)=> {
    connected++;
    io.emit("update", {c: connected});

    io.emit("msg", { message: "> System : User connected" });

    socket.on("message", (content)=>{
        io.emit("msg", { message: `$${content}` });
    });

    socket.on("disconnect", ()=>{
        connected--;
        io.emit("update", {c: connected});
    });
});

server.listen(_PORT, ()=>{
    console.log("Web online chat in localhost:" + _PORT);
});