const { Server } = require('net')

// Instanciamos servidor
const server = new Server()

const END = 'end' //palabra para terminar la conexión

// Preparamos para cualquier conexión
server.on('connection', (socket) => {
  const remoteSocket = `${socket.remoteAddress}:${socket.remotePort}`
  console.log('Nueva conexión:', remoteSocket)
  
  socket.setEncoding('utf-8') // Codificación de datos
  // Revisamos si el socket tiene datos (evento)
  socket.on('data', (data) => {
    if(data === END){
      socket.end()
    }else{
      console.log(`${remoteSocket}->${data}`)
    }
  })

  // Verificamos si ambos sockets se cerraron
  socket.on('close', ()=>{
    console.log('Conexión con ',remoteSocket,'terminada')
  })
})


server.listen({port:3000, host:'0.0.0.0'}, () => {
  console.log("Listening on port 3000")
})