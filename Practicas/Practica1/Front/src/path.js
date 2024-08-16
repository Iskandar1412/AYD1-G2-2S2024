let dir = "192.168.0.18";
// let dir = "localhost";
// let dir = "104.198.226.197";

// const cambiarDir = () => {
//   const nuevoDir = prompt("Ingrese IP Server Backend (Default: Localhost):", dir);
//   if (nuevoDir !== null) {
//     dir = nuevoDir;
//     alert(`New IP Server Backend: --> http://${dir}:9200`);
//   }
// };


// const inicializar = () => {
//   cambiarDir(); 
// };

// inicializar();

export const pathbackend = "http://" + dir + ":9200";