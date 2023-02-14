const { Socket } = require("net");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
}); //Lectura desde consola

const error = (err) => {
  console.error(err);
  process.exit(1); // NO OK
};
const END = "end"; // Palabra para terminar la conexión
const connect = (host, port) => {
  console.log(`Conectando con ${host}:${port}`)
  const socket = new Socket();
  socket.connect({ host, port });
  socket.setEncoding("utf-8");
  socket.on('connect', ()=>{
    console.log('Conectado')
    readline.question('Ingrese su usuario: ', (username) => {
      socket.write(username)
      console.log('Escribe un mensaje para enviarlo, end para terminar')
    }) // Enviamos el primer mensaje leyendo el usuario

    // Evento por si se encuentra una linea en la consola
    readline.on("line", (message) => {
      if (message === END) {
        //cerramos socket y terminamos proceso
        console.log("Conexión terminada");
        socket.end(); // esperamos a que el servidor confirme cierre
      } else {
        socket.write(message); // Mandamos la linea que se escribió
      }
    });
  
    // Verificamos si el servidor nos envió datos
    socket.on("data", (data) => {
      console.log(data);
    });

  })

  // Verificamos si el servidor confirmo cierre
  socket.on("close", () => process.exit(0));

  socket.on("error", (err) => error(err.message));
};

const main = () => {
  if (process.argv.length !== 4) {
    error(`Usé: node ${__filename} host port`);
  }
  let [, , host, port] = process.argv;
  if (isNaN(port)) {
    error("Puerto invalido");
  }
  port = Number(port);
  connect(host, port);
  console.log(`${host}:${port}`);
};

if (require.main === module) {
  // Si este módulo es el principal
  main();
}
