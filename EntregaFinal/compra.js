let peliculaDeseada = sessionStorage.getItem("peliDeseada")
let usuario = sessionStorage.getItem('usuario')
const database = "./peliculas.JSON"
let nombre
let total = 0
extraerDatos(peliculaDeseada, database);

$(`#add-button`).click(function(){
	
	let butacasDeseadas = document.getElementById('butacasIngresadas')
	let tipoFuncionIngresado = document.getElementsByName('tipo')
	let tipoPelicula

	butacasDeseadas = parseInt(butacasDeseadas.value)
	for (var i=0; i<tipoFuncionIngresado.length; i++) {
		if (tipoFuncionIngresado[i].checked == true) {
			tipoPelicula = tipoFuncionIngresado[i].value
		}
	}
	if(tipoPelicula != undefined &&  butacasDeseadas != undefined ){
		butacasDisponibles(peliculaDeseada, butacasDeseadas, tipoPelicula, database)
	}
	else{
		alert("error")
	}
});





function extraerDatos(id, basedatos){
	let peliculas;
	$.get(basedatos, function(response, state){
		if (state== "success"){
			peliculas = response
			for (const peli of peliculas){
				if ( id == peli.id){
                    $(`#imagen`).replaceWith(`<a id="imagen" href="#"><img src="${peli.imagenPoster}" alt="" ></a>`)
					$(`#nombrePelicula`).replaceWith(`<h2 id="nombrePelicula">${peli.nombre}</h2>`)
					nombre = peli.nombre
				}
			}
		}
	});
}


function calcularPrecio( butacas, tipo){
	
	if (tipo == '2D'){
		total = precioTotal(400, butacas)
		generarResumen(butacas, tipo, total)
	}
	if(tipo == '3D'){
		total = precioTotal(600, butacas)
		generarResumen(butacas, tipo, total)
	}
	

}
function generarResumen(butacas, tipo, total){
	let tresCuotas = total/3
	let seisCuotas = total/6
	tresCuotas = tresCuotas.toFixed(2)
	seisCuotas = seisCuotas.toFixed(2)
	$(`#resumen-compra`).replaceWith(`	<div id="resumen-compra" class="total">
	<h1 id="resumen" class="resumen">RESUMEN DE COMPRA:</h1>
	<h2 id="resumen-nombre" class="resumen-nombre">Titulo: ${nombre}</h2>
	<h2 id="resumen-cantidad" class="resumen-cantidad">Cantidad de entradas: ${butacas}</h2>
	<h2 id="resumen-tipo" class="resumen-tipo">Tipo: ${tipo}</h2>
	<h2 id="resumen-precio" class="resumen-precio">TOTAL: ${total}</h2>
	   <form class="resumen-formulario">
		   <select id="cantidad-cuotas">
			<option disabled selected="">Ingrese Cantidad de Cuotas</option>
			   <option value="1">1x${total}$..............${total}$</option>
			<option value="3">3x${tresCuotas}$............${total}$</option>
			<option value="6">6x${seisCuotas}$............${total}$</option>
		</select>
		
	</form>
	<input type="button" id="boton-comprar" class="pretty-button" value="Confirmar Compra">
	</div>`)
	$(`#boton-comprar`).click(function(){
		let precioCuota
		let cuotasselec = document.getElementById("cantidad-cuotas").value
		precioCuota= (total/cuotasselec).toFixed(2)
		
		const compra = {pelicula: nombre, butacas: butacas, tipo: tipo, total: total, precioCuota: precioCuota}
		const compraJSON = JSON.stringify(compra)
		sessionStorage.setItem('compra', compraJSON)
		location.href= 'factura.html' 
	})
}



function butacasDisponibles (id, butacas, tipo, basedatos){
	
	let datos
	$.get(basedatos, function(response, state){
		if (state == "success"){
			datos=response
			for(const peli of datos){
				if (id == peli.id){
					if(tipo == '2D'){
						if (butacas <= peli.entradas2D){
							calcularPrecio( butacas, tipo)
						}
						else {
							alert("No hay la cantidad de Butacas Deseadas")
							location.href = 'compra.html'
						}
					}
					else if (tipo == '3D'){
						if (butacas <= peli.entradas3D){
							calcularPrecio( butacas, tipo)
						}
						else {
							alert("No hay la cantidad de Butacas Deseadas")
							location.href = 'compra.html'
						}
					}



				}
			}
		}
	});
}
 function precioTotal (precio, butacas){
    let total= precio*butacas
    return total;   
 }



   
 






