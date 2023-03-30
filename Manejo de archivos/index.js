import ProductManager from "./productsManager.js";

const path = './productos.json'
const producto = new ProductManager(path);

const consulta = async ()=>{

    let nuevoProducto = {
        title: "Computadora",
        description: "Nueva PC",
        precio: "850.50",
        thumpnail:"img",
        code: "5e23",
        stock: 84
    }

    let nuevoProducto2= {
        title: "Computadora",
        description: "Nueva PC",
        precio: "850.50",
        thumpnail:"img",
        code: "5e23",
        stock: 85
    }

    let nuevoProducto3 = {
        title: "Computadora",
        description: "Nueva PC",
        precio: "850.50",
        thumpnail:"img",
        code: "5e23",
        stock: 86
    }

     await producto.addProducts(nuevoProducto);
     await producto.addProducts(nuevoProducto2);
     await producto.addProducts(nuevoProducto3);
    

    let productos = await producto.getProducts();

    console.log(productos);

    let productById = await producto.getProductsById(3);

    console.log(productById);

    let nuevoProducto4 = {
        title: "Computadora",
        description: "Nueva PC",
        precio: "850.50",
        thumpnail:"imgimg",
        code: "5e232222",
        stock: 76
    }

    let updateProducts = await producto.updateProduct(3,nuevoProducto4);
    updateProducts;


   let deleleProducts = await producto.deleteProduct(3);
   console.log(deleleProducts);
}

consulta();