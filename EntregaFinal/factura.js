const compra = JSON.parse(sessionStorage.getItem('compra'))
let usuario = sessionStorage.getItem('usuario')
let comprobante = document.getElementById("factura")
let card = document.createElement("div") 
    card.innerHTML = `<h1> FELICIDADES: ${usuario}  </h1>
                    <h2> Compra Existosa!</h2>
                        <h2> COMPROBANTE: </h2>
                        <p> Pelicula: ${compra.pelicula}</p>
                        <p> Butacas: ${compra.butacas}</p
                        <p> Tipo de Funcion: ${compra.tipo}</p>
                        <p> Precio cuotas: ${compra.precioCuota}</p>
                        <h2> Precio Total: ${compra.total}</h2>`
    comprobante.appendChild(card)