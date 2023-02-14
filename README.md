# Servidor chat usando NODE
* Este es un programa de chat usando sockets con node
* Se inicia el servidor con un puerto (node server.js 8000)
* El cliente se inicia con un host y puerto (node client.js localhost 8000)
* El servidor recibe las conexiónes y el primer mensaje lo almacena en un Map (como su usuario) `socket -> usuario`
* El cliente (usuario) se conecta al servidor y digita su usuario para que el servidor lo guarde en el Map
* El cliente se desconecta usando 'end'
<hr>
NOTA:

- Para este programa se usa módulo 'net' propio de NODE
- Se usa el módulo propio de node: **readline** para interactuar desde la consola.
```js
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
}); //Lectura desde consola
```
