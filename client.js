const {Socket} = require('net')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
}) //Lectura desde consola
const socket = new Socket()

socket.connect({host:'localhost', port:3000})
socket.setEncoding('utf-8') 

// Evento por si se encuentra una linea en la consola
readline.on('line', (line) => {
  socket.write(line) // Mandamos la linea que se escribió
})


// Verificamos si el servidor nos envió datos
socket.on('data', (data) => {
  console.log(data)
})
