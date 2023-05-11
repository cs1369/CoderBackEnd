import fs from 'fs'

export default class ProductManager{
    constructor(){
        this.path='../product.json';
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
            console.log(producto);
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

            let product = this.products.findIndex(x => x.id==idProduct);

            if(objeto.title) this.products[product].title = objeto.title;
            if(objeto.description) this.products[product].description = objeto.description;
            if(objeto.code) this.products[product].code = objeto.code;
            if(objeto.price) this.products[product].price = objeto.price;
            if(objeto.status === false || objeto.status === true) this.products[product].status = objeto.status;
            if(objeto.stock) this.products[product].stock = objeto.stock;
            if(objeto.category) this.products[product].category = objeto.category;
            if(objeto.thumbnails) this.products[product].thumbnails = [...this.products[product].thumbnails,...objeto.thumbnails];

            await fs.promises.unlink(this.path);
            await fs.promises.writeFile(this.path,JSON.stringify(this.products,null,'\t'));
    }

    deleteProduct = async(idProduct)=>{
        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
        let products = this.products.filter(x => x.id != parseInt(idProduct));        

    if(parseInt(products.length) > 0){           
        await fs.promises.unlink(this.path);
        await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'));
    }
    }

}