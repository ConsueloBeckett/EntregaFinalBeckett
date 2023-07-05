
semilla = function(nombre,precio,caracteristica,cantidad){
this.nombre= nombre,
this.precio= precio,
this.caracteristica= caracteristica,
this.cantidad= cantidad
}

Swal.fire({
  title: 'Bienvenido',
  text: 'Por favor, selecciona tus semillas.',
  imageUrl: 'https://tinyurl.com/25pknjqk',
  imageWidth: 550,
  imageHeight: 400,
  imageAlt: 'img fruta',
})


let semilla1= new semilla ("Berenjena 🍆", 2500,  "es una hortaliza de color morado oscuro que se utiliza en muchas preparaciones culinarias.",10 );
let semilla2= new semilla ("Frutilla 🍓", 3000,  "es una fruta dulce y aromática que se utiliza en postres y otros platos dulces.",20 );
let semilla3= new semilla ("Durazno 🍑", 2500,  "es una fruta jugosa y dulce que se consume fresca o en conserva.",15 );
let semilla4= new semilla ("Tomate 🍅", 1500,  "es una hortaliza muy versátil que se utiliza en muchas preparaciones culinarias.",30 );
let semilla5= new semilla ("Arandano 🫐 ", 5000,  "es una fruta pequeña y dulce que se utiliza en postres y otros platos dulces.",8 );
let semilla6= new semilla ("Cereza 🍒 ", 5000,  "es una fruta dulce y jugosa que se consume fresca o en conserva",20 );
let semilla7= new semilla ("Sandia 🍉 ", 3000,  "es una fruta grande y refrescante que se consume principalmente en verano.",20 );
let semilla8= new semilla ("Mango 🥭", 3000,  "es una fruta tropical dulce y jugosa que se consume fresca o en conserva.",15 );
let semilla9= new semilla ("Pera 🍐", 2000,  "es una fruta  dulce y jugosa que se consume tantp cruda como al horno.",25 );


let catalogo = [semilla1,semilla2,semilla3,semilla4,semilla5,semilla6,semilla7,semilla8]


function buscaSemillas(){
const body = document.querySelector('body');

const input = document.getElementById('eleccionUsuario').value // valor de seleccion usuario

const userSelection = input.trim().toUpperCase();

const resultSemilla = catalogo.filter((semilla) => semilla.nombre.toUpperCase().includes(userSelection));
 
if (resultSemilla.length > 0){ 
const container = document.createElement('div');
container.classList.add('card-container');

resultSemilla.forEach((semilla) => { 
 const card = document.createElement('div');
 card.classList.add('card'); 

 const nombre = document.createElement('p');  
 nombre.textContent = semilla.nombre;
 card.appendChild(nombre);

 const precio = document.createElement('p'); 
 precio.textContent = `Precio: ${semilla.precio}`;
card.appendChild(precio);

const caracteristica = document.createElement('p'); 
caracteristica.textContent = `Caracteristica: ${semilla.caracteristica}`;
card.appendChild(caracteristica);
 
const cantidad = document.createElement('p'); 
cantidad.textContent = `Cantidad en stock: ${semilla.cantidad}`;
card.appendChild(cantidad);

container.appendChild(card); //  crea una card 
});
body.appendChild(container);
}else {
  Swal.fire(
    'Por el momento no contamos con ese producto',
    '💡 puedes pedir una semilla en el boton SOLICITAR',
    'error'
    )
}}




function solicitarSemilla(){
const solicitarForm = document.createElement(`form`);
solicitarForm.innerHTML =`
<div class="form">
<label for="nombre-input">Nombre:</label>
<input id="nombre-semilla" type="text" required>

<label for="precio-input">Precio:</label>
<input id="precio-semilla" type="number"  step="0.01" required>

<label for="caracteristica-input">Semilla modificada:</label>
<select id="caracteristica-semilla" required>
  <option value="S">Sí</option>
  <option value="N">No</option>
</select>

<label for="cantidad-input">Cuanta cantidad desea?:</label>
<input id="cantidad-semilla" type="number" step="1" required>

<button id="button" type="submit">Solicitar</button>
</div>
`;

solicitarForm.addEventListener('submit', function(event) {
event.preventDefault(); 


const solicitarNombre = document.getElementById('nombre-semilla').value.trim();
const solicitarPrecio = parseFloat(document.getElementById('precio-semilla').value);
const solicitarCaracteristica = document.getElementById('caracteristica-semilla').value.trim();
const solicitarCantidad = parseFloat(document.getElementById('cantidad-semilla').value);


if (isNaN(solicitarPrecio) || isNaN(solicitarCantidad) || solicitarNombre === '' || solicitarCaracteristica === '') {
  Swal.fire('ingresa valores validos, por favor.')
return;
}

const semillaNueva = new semilla(solicitarNombre, solicitarPrecio, solicitarCaracteristica, solicitarCantidad);


if (catalogo.some((elemento) => elemento.nombre === semillaNueva.nombre)){
  Swal.fire('la solcitud de semilla ya esta en el catalogo')
return;
}

catalogo.push(semillaNueva);

localStorage.setItem("semillas", JSON.stringify(catalogo));
Swal.fire({
  title: `Se ha solicitado correctamente la semilla de ${semillaNueva.nombre} `,
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  }
})

//mostrar en html
console.table(semillaNueva);

const container = document.createElement('div');
container.classList.add('card-container');

catalogo.forEach((semillaNueva) => {
const card = document.createElement('div');
card.classList.add('card');

const nombre = document.createElement('h4');  
 nombre.textContent = semillaNueva.nombre;
 card.appendChild(nombre);

 const precio = document.createElement('p'); 
 precio.textContent = `Precio: ${semillaNueva.precio}`;
card.appendChild(precio);

const caracteristica = document.createElement('p'); 
caracteristica.textContent = `Caracteristica: ${semillaNueva.caracteristica}`;
card.appendChild(caracteristica);
 
const cantidad = document.createElement('p'); 
cantidad.textContent = `Cantidad en stock: ${semillaNueva.cantidad}`;
card.appendChild(cantidad);

container.appendChild(card); 

});

const body = document.querySelector('body');
body.appendChild(container);

solicitarForm.reset();

});

const body = document.querySelector('body');
body.appendChild(solicitarForm);
}


//  botton solicitar semilla
const solicitarBoton = document.getElementById("solicite");
solicitarBoton.addEventListener("click", () => {
 solicitarSemilla(); 
});


//  botton buscar semilla
const filtradoBoton = document.getElementById("buscar");
filtradoBoton.addEventListener("click", () => {
 buscaSemillas(); 
});


const listaProductos = document.querySelector("#lista-opciones");


fetch("./productos.json")
  .then(response => response.json())
  .then(data => {
    data.forEach(producto => {
      const p = document.createElement("p");
      p.innerText =  " * " +producto.nombre + " /  "+ " Precio: $" + producto.precio  + " /  " + " Stock: " + producto.cantidad + " unid " ;
      listaProductos.appendChild(p);
    });
  })
