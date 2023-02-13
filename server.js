const { Server } = require('net')

// Instanciamos servidor
const server = new Server()

// Preparamos para cualquier conexión
server.on('connection', (socket) => {
  console.log('Se conectó un nuevo usuario con IP: ', socket.remoteAddress,':', socket.remotePort)
  
  socket.setEncoding('utf-8') // Codificación de datos
  // Revisamos si el socket tiene datos (evento)
  socket.on('data', (data) => {
    socket.write(data.toUpperCase()) // Devolvemos un mensaje (con mayusculas)
  })
})


server.listen({port:3000, host:'0.0.0.0'}, () => {
  console.log("Listening on port 3000")
})