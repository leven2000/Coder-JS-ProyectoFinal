const database = "./peliculas.JSON"
let trailer = `https://www.youtube.com/watch?v=r6t0czGbuGI`;
let usuario = sessionStorage.getItem('usuario')
let idPeliculaPrincipal = 1;


const fila = document.querySelector('.contenedor-carousel');
const peliculas = document.querySelectorAll('.pelicula');

const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');

$(`#cuenta`).replaceWith(`<a id="cuenta">${usuario}</a>`)

// ? ----- ----- Event Listener para la flecha derecha. ----- -----//
flechaDerecha.addEventListener('click', () => {
	fila.scrollLeft += fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.nextSibling){
		indicadorActivo.nextSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Event Listener para la flecha izquierda. ----- -----//
flechaIzquierda.addEventListener('click', () => {
	fila.scrollLeft -= fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.previousSibling){
		indicadorActivo.previousSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

$(document).ready(function(){
	$(`#p1`).click(function(){
		cambiarBanner(1,database);
	});
	$(`#p2`).click(function(){
		cambiarBanner(2,database);
	});
	$(`#p3`).click(function(){
		cambiarBanner(3,database);
	});
	$(`#p4`).click(function(){
		cambiarBanner(4,database);
	});
	$(`#p5`).click(function(){
		cambiarBanner(5,database);
	});
	$(`#p6`).click(function(){
		cambiarBanner(6,database);
	});
	$(`#p7`).click(function(){
		cambiarBanner(7,database);
	});
	$(`#boton-trailer`).click(function(){
	location.href= trailer
	});
	$(`#boton-comprar`).click(function(){
		sessionStorage.setItem("peliDeseada", idPeliculaPrincipal)
		location.href= `compra.html`
	});
});

function cambiarBanner(id, basedatos){
	let peliculas;
	$.get(basedatos, function(response, state){
		if (state== "success"){
			peliculas = response
			for (const peli of peliculas){
				if ( id == peli.id){
					$(`#tituloPeliPrincipal`).replaceWith(`<h3 id="tituloPeliPrincipal" class="titulo">${peli.nombre}</h3>`)
					$(`#imagen-principal`).replaceWith(`<style id="imagen-principal">
															#pelicula-principal{
						   										background: linear-gradient(rgba(0, 0, 0, .50) 0%, rgba(0, 0, 0, .50)  100%), url(${peli.imagenFondo});
																background-position: center center;
																background-size: cover;
															}
														</style>`)
					$(`#descripcion`).replaceWith(`<p class="descripcion">${peli.descripcion} </p>`)	
					trailer = peli.trailer	
					idPeliculaPrincipal = peli.id							
				}
			}
		}
	});
}


