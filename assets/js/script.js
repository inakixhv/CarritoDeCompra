
function Producto(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;

}
function Carrito() {
    this.productos = [];
}
function agregarAlCarrito(producto) {
    // console.log(typeof(producto.precio));

    carrito.productos.push(producto);
    total() ;
}
function total() {
    let total = 0;
    carrito.productos.forEach((producto) => {
        // console.log(producto);
        total += producto.precio * producto.cantidad;
    });
    montoTotal.innerHTML = total;
    return total;
}
function eliminarProducto(indice) {
    carrito.productos.splice(indice, 1);
    if(carrito.productos.length == 0) {
        botonFinalizar.classList.remove("btn-success");
        botonFinalizar.classList.add("btn-secondary");
        totalCarrito.style.display = "none";
    }
    total() ;
    mostrarcarrito(carrito);
}
function mostrarcarrito(carrito) {
    articulosCarrito.innerHTML = "";
    for (let i = 0; i < carrito.productos.length; i++) {
        articulosCarrito.innerHTML += `<li class="linea">
                    <div class="listaCarrito">
                        <div>${carrito.productos[i].nombre}</div>
                        <div>$${carrito.productos[i].precio}</div>
                        <div>${carrito.productos[i].cantidad}</div>
                        <div>$${carrito.productos[i].precio * carrito.productos[i].cantidad}</div>
                    </div>

                    <button class="btn btn-danger" onclick="eliminarProducto(${i})" ><ion-icon name="close-outline"></ion-icon></button>
                </li>`
    }

}
let listaArticulos = document.getElementById("listaArticulos");

function mostrarListaArticulos() {
    listaArticulos.innerHTML = "";
    for (let i = 0; i < listaProductos.length; i++) {
        listaArticulos.innerHTML += `<li>${listaProductos[i].nombre} $${listaProductos[i].precio}</li>`
    }
}







let listaProductos = [
    new Producto("Pan", 1000),
    new Producto("Leche", 200),
    new Producto("Manzana", 500),
    new Producto("Manteca", 300),
    new Producto("Queso", 700)
]
mostrarListaArticulos();
// console.log(listaProductos[1].precio);

let carrito = new Carrito();
// console.log(carrito);
let articulosCarrito = document.getElementById("articulosCarrito");
let botonAgregar = document.getElementById("agregarProductos");
let botonFinalizar = document.getElementById("finalizarCompra");
let totalCarrito = document.getElementById("totalCarrito");
let montoTotal = document.getElementById("montoTotal");
botonAgregar.addEventListener("click",function clickBotonAgregar () {
    // let ciclo = true;
    // while(ciclo){
    // console.log("entro al ciclo");

    Swal.fire({
        title: "Ingrese ID del producto:",
        input: "number",
        showCancelButton: true,
        // showDenyButton: true,
        inputAttributes: {
            min: 1,
            max: 5
        }

    }).then((result) => {
        // alert(`El resultado es ${result.value}`);
        if (result.isConfirmed) {
            let id = result.value - 1;

            Swal.fire({
                title: `El Producto es: ${listaProductos[id].nombre} con un precio de: $${listaProductos[id].precio}`,
                text: "Ingrese la cantidad que desee del producto:",
                input: "number",
                showCancelButton: true,
                inputAttributes: {
                    min: 1
                    
                }

            }).then((resultado) => {
                if (resultado.isConfirmed) {
                    let cantidad = Number(resultado.value);
                    // console.log(typeof(cantidad));

                    let validador = -1;
                    for (let i = 0; i < carrito.productos.length; i++) {
                        if (carrito.productos[i].nombre == listaProductos[id].nombre) {
                            validador = i;
                            break;
                        }
                    }
                    if (validador != -1) {
                        carrito.productos[validador].cantidad = carrito.productos[validador].cantidad + cantidad;
                        total() ;
                    } else {
                        botonFinalizar.classList.remove("btn-secondary");
                        botonFinalizar.classList.add("btn-success");
                        agregarAlCarrito({
                            nombre: listaProductos[id].nombre,
                            precio: listaProductos[id].precio,
                            cantidad: cantidad
                        });

                    }
                    mostrarcarrito(carrito);
                    console.log(carrito.productos);
                    Swal.fire({
                        title:"Desea agregar otro producto?",
                        showConfirmButton: true,
                        confirmButtonText: "Si",
                        showCancelButton: true,
                        cancelButtonText: "No"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            clickBotonAgregar();
                    }})
                }

            });
            console.log(carrito.productos);

        } else {
            console.log("se cancelo");

            // ciclo = false
        }
    })
});

botonFinalizar.addEventListener("click", () => {
    Swal.fire({
        title: `El total a pagar es: $${total()}`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Pagar`,
        denyButtonText: `No pagar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */}
    )
    totalCarrito.style.display = "flex";
    
});


let botonDesc = document.getElementById("botonDesc");
botonDesc.addEventListener("click", function(){
    // totalCarrito.style.display = "none";
    Swal.fire({
        title: 'ID producto a aplicar Descuento',
        input: 'number',
        inputAttributes: {
            min: 1,
            max: 5
        }

    }).then((result) => {
        if (result.isConfirmed) {
            let id = result.value - 1;

            Swal.fire({
                title: `Cuanto descuento desea aplicarle a: ${listaProductos[id].nombre}?`,
                input: 'number',
            }).then((result) => {
                if (result.isConfirmed) {
                    let desc = 1-( Number(result.value )/100);
                    console.log(desc);
                    listaProductos[id].precio = listaProductos[id].precio * desc;
                    console.log(listaProductos);
                    
                    // carrito.productos[id].descuento = desc;
                    carrito.productos.forEach((producto) => {
                        console.log(producto);
                        
                        if(producto.nombre == listaProductos[id].nombre){
                            producto.precio =   listaProductos[id].precio;
                            
                        }
                    })
                    mostrarListaArticulos() ;
                    mostrarcarrito(carrito);
                    total();
                }
            })
        }

    })
});