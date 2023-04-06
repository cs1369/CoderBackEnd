import fs from 'fs'

export default class ProductManager{
    constructor(){
        this.path='./productos.json';
        this.products=[];
    }

    getProducts = async()=>{
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            return this.products;
        }else{
            return [];
        }
    }
    
    addProducts = async(producto)=>{
        const products = await this.getProducts();
        if(products.length === 0){
            producto.id = 1;
        }else{
            producto.id= products[products.length-1].id+1;
        }
        products.push(producto);
        await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'));
    }

    getProductsById = async(idProduct)=>{
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            let productById = this.products.find(x => x.id===idProduct);
            return productById;
        }else{
            return 'El producto no existe';
        }
    }

    updateProduct = async(idProduct,objeto)=>{
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            let productos = this.products.filter(x => x.id!==idProduct);
        if(parseInt(productos.length) > 0){           
            objeto.id = idProduct;
            productos.push(objeto);
            await fs.promises.unlink(this.path);
            await fs.promises.writeFile(this.path,JSON.stringify(productos,null,'\t'));
            return 'Se modifico correctamente el producto';
        }else{
            return 'No hay productos en la lista';
        }
    }

    deleteProduct = async(idProduct)=>{
        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
        let productos = this.products.filter(x => x.id!==idProduct);
    if(parseInt(productos.length) > 0){           
        await fs.promises.unlink(this.path);
        await fs.promises.writeFile(this.path,JSON.stringify(productos,null,'\t'));
        return 'Se elimino correctamente el producto';
    }else{
        return 'No hay productos en la lista';
    }
    }

}

/* const path = './productos.json'
const producto = new ProductManager();

const consulta = async ()=>{

    let nuevoProducto = {
        title: "Mouse",
        description: "Nueva Mouse",
        precio: "1850.50",
        thumpnail:"img",
        code: "5e23",
        stock: 84
    }

    let nuevoProducto2= {
        title: "Computadora",
        description: "Nueva PC",
        precio: "22850.50",
        thumpnail:"img",
        code: "5e24",
        stock: 85
    }

    let nuevoProducto3 = {
        title: "Teclado",
        description: "nuevo taclado",
        precio: "1550.50",
        thumpnail:"img",
        code: "5e26",
        stock: 86
    }

     await producto.addProducts(nuevoProducto);
     await producto.addProducts(nuevoProducto2);
     await producto.addProducts(nuevoProducto3);
} */
