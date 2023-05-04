const socket = io()

const formulario = document.getElementById("formProducto")

formulario.addEventListener('submit', (e)=>{
    e.preventDefault()
    const iteradorProducts = new FormData(e.target)
    const prod = Object.fromEntries(iteradorProducts) //Transforma del objeto iterador recibido a uno mas simple
    console.log(prod)
    socket.emit("Nuevo Producto", {prod})
})

// const parrafoMensaje = document.getElementById('parrafoMensaje')
// const botonChat = document.getElementById('bottonChat')
// const box = document.getElementById('inputChat')

// let user

// Swal.fire({
//     title: "Identificacion de Usuario",
//     text: "Ingrese su Nombre de Usuario",
//     input: "text",
//     inputValidator: (valor) =>{
//         return !valor && 'Ingrese un valor Valido'
//     },
//     allowOutsideClick : false
// }).then(resultado =>{
//     user.resultado.value
//     console.log(user)
// })

// botonChat.addEventListener('click', () =>{
//     if(box.value.trim().length > 0){
//         socket.emit("mensaje", { usuario: user, mensaje: box.value})
//         box.value = ""
//     }
// })

// socket.on("mensajes", arrayMensajes =>{
//     parrafoMensaje.innerHTML = ""
//     arrayMensajes.forEach(mensaje =>{
//         parrafoMensaje.innerHTML += `<p>${mensaje.usuario}:${mensaje.mensaje}</p>`
//     })
// })