
const socket = io();

const btn = document.getElementById('Cargar');

btn.addEventListener('click',()=>{

	socket.emit("add","Producto Cargado");
});
