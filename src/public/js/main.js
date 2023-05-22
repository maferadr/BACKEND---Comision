const socket = io()

const formulario = document.getElementById("formProducto")

formulario.addEventListener('submit', (e)=>{
    e.preventDefault()
    const iteradorProducts = new FormData(e.target)
    const prod = Object.fromEntries(iteradorProducts) //Transforma del objeto iterador recibido a uno mas simple
    console.log(prod)
    socket.emit("Nuevo Producto", {prod})

    const typeMethod = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(prod),
      };
    
      fetch("/product", typeMethod)
        .then((response) => {
          if (response.ok) console.log(response);
          else throw new Error(response.status);
        })
        .catch((err) => {
          console.error("ERROR: ", err.message);
        });
    
        socketClient.emit("prod", { ...prod});
        socketClient.on("productoFromForm", (productsListArray) => {
            let listToRender = "";
    
            productsListArray.forEach(product => {
                listToRender += `-Producto: "${product?.title}" está en tu lista</br>
                </br> `
            });
    
            listProduct.innerHTML = listToRender
        })
})

let formDeleteProducts = document.getElementById("deleteForm");
let inputDeleteByIdProduct = document.getElementById("pID");

formDeleteProducts.addEventListener("submit",(e)=>{
  e.preventDefault()

  let deleteProdutc = inputDeleteByIdProduct.value
  let direc = "/product/" + deleteProdutc

  const typeMethod = {
    method : "DELETE",
    headers:{'Content-type': 'application/json; charset=UTF-8',}
  }

  fetch(direc, typeMethod)
    .then(response =>{
      if(response.ok){
        console.log(response)
      } else{
        throw new Error(response.status);
      }
    })
    .then(socketClient.emit("prodDelete",{id: deleteProdutc}))
    .catch(error =>{
        console.log(error)
    })
    
    
    socketClient.on("prodDeletelist", (obj)=>{
      let listNew = ""

      obj.forEach(pDelete =>{
        listNew += `
        -Producto: "${pDelete.title}" está en tu lista </br>
        </br>`
      })

      listProduct.innerHTML = listNew

    })
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