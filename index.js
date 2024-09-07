const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

// Levantar un servidor local usando Express Js en localhost 3000 
app.listen(3000, console.log("¡Servidor encendido!"));

app.use(cors());
app.use(express.json());

// Devolver una página web como respuesta a una consulta GET 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Ofrecer diferentes rutas con diferentes métodos HTTP que permitan las operaciones CRUD de datos alojados en un archivo JSON local
app.get('/canciones', (req, res) => {
  const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'));
  res.json(canciones);
});

// Manipular el payload de una consulta HTTP al servidor 
app.post("/canciones", (req, res) => {
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  canciones.push(cancion);
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("Canción agregada con éxito!");
});

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("canciones.json"))
  res.json(canciones)
})

// Manipular los parámetros obtenidos en la URL
app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params; 
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = canciones.findIndex(c => c.id == id);
  if (index !== -1) {
    canciones.splice(index, 1);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("Canción eliminada con éxito!");
  } else {
    res.status(404).send("Canción no encontrada");
  }
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params; 
  const cancionActualizada = req.body; 
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = canciones.findIndex(c => c.id == id);
  if (index !== -1) {
    canciones[index] = { id, ...cancionActualizada }; 
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("Canción modificada con éxito!");
  } else {
    res.status(404).send("Canción no encontrada");
  }
});
