const { Server } = require('net')

const host = '0.0.0.0'
const END = 'end' //palabra para terminar la conexión
const error = (err) => {
  console.error(err)
  process.exit(1) // NO OK
}
const listen = (port) => {
  // Instanciamos servidor
  const server = new Server()
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
  server.listen({port:port, host:'0.0.0.0'}, () => {
    console.log("Listening on port ", port)
 })
}

const main = ()=>{
  if(process.argv.length !== 3){
    error(`Usé node ${__filename} port`)
  }
  console.log(process.argv) // Argumentos de la consola
  let port = process.argv[2]
  if(isNaN(port)){
    error(`Puerto Invalido ${port}`)
  }
  port = Number(port)
  listen(port)
}

if(require.main === module){
  main()
}// Verificamos que se esté ejecutando este programa y no se esté importando


