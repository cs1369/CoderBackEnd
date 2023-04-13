import fs from 'fs';
import ProductManager from './ProductManager.js';

const Product = new ProductManager();

export default class CartManager{
    constructor(){
        this.path='../carts.json';
        this.carts=[];
    }

    getCartsById = async(idCart)=>{
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
            let cartById = this.carts.find(x => x.id == idCart);
            return cartById;
        }
    }
    
    createCart = async()=>{
        let data;
        let carts = [];
        if(fs.existsSync(this.path)){
            data = await fs.promises.readFile(this.path, 'utf-8');
            carts = JSON.parse(data);
        }
        let newCarts={};
        if(carts.length === 0){
            newCarts.id = 1;
            newCarts.products = [];
        }else{
            newCarts.id = carts[carts.length-1].id+1;
            newCarts.products = [];
        }
        carts.push(newCarts);
        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,'\t'));
    }

    addProductCart = async(idCart,idProduct)=>{
        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.carts = JSON.parse(data);

        const products = await Product.getProducts();

        let eCart = this.carts.find(x => x.id == idCart);
        let eProduct = products.find(x=> x.id == idProduct);

        if(eCart && eProduct) {
           let productInCart = eCart.products.find(p => p.idProduct == idProduct);
           if(!productInCart){
            eCart.products.push({idProduct: parseInt(idProduct),quantity : 1});
           }else{
            eCart.products=eCart.products.map((x)=> (x.idProduct == idProduct ?{idProduct, quantity: x.quantity + 1} : x));
           }

        this.carts=this.carts.map(x => (x.id == idCart? eCart : x));
        await fs.promises.unlink(this.path);
        await fs.promises.writeFile(this.path,JSON.stringify(this.carts,null,'\t'));
        }else{
            return 'El Carrito o El Producto no existe';
        }
    }
}