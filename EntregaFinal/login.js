const usuario1 = new usuarios ('admin', 'admin')
const usuario2 = new usuarios ('123', 123)
const listaUsuarios = [usuario1, usuario2]

let addButton = document.getElementById("add-button")
let usuarioIngresado = document.getElementById('usuario')
let contraseñaIngresada = document.getElementById('contraseña')

addButton.addEventListener('click', validarUsuario)

function validarUsuario (){
    let contraseña = contraseñaIngresada.value
    let usuario = usuarioIngresado.value
    for(const nombre of listaUsuarios){
        if ((nombre.nombre==usuario) && (nombre.contraseña == contraseña)){
            sessionStorage.setItem("usuario", usuario)
            sessionStorage.setItem('contra', contraseña)
            location.href = 'index.html'
        }
    }
}

function usuarios (nombre, contraseña){
    this.nombre = nombre;
    this.contraseña = contraseña;
}
