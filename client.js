const {Socket} = require('net')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
}) //Lectura desde consola

const error = (err) => {
  console.error(err);
  process.exit(1); // NO OK
};

const socket = new Socket()
const END = 'end' // Palabra para terminar la conexión

socket.connect({host:'localhost', port:3000})
socket.setEncoding('utf-8') 

// Evento por si se encuentra una linea en la consola
readline.on('line', (message) => {
  if(message === END){ //cerramos socket y terminamos proceso
    console.log('Conexión terminada');
    socket.end() // esperamos a que el servidor confirme cierre 
  }else{
    socket.write(message) // Mandamos la linea que se escribió
  }
})


// Verificamos si el servidor nos envió datos
socket.on('data', (data) => {
  console.log(data)
})

// Verificamos si el servidor confirmo cierre
socket.on('close', () => process.exit(0))

const main = ()=>{
  if(process.argv.length !== 4){

  }
}