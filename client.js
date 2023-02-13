const {Socket} = require('net')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
}) //Lectura desde consola
const socket = new Socket()

socket.connect({host:'localhost', port:3000})
socket.setEncoding('utf-8')

// Verificamos si el servidor nos envió datos
socket.on('data', (data) => {
  console.log(data)
})
