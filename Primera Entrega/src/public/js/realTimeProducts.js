const socket = io();

const title = document.getElementById('title');
const description = document.getElementById('description');
const code = document.getElementById('code');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const category = document.getElementById('category');
const thumbnails = document.getElementById('thumbnails');
const btn = document.getElementById('btnCargar');

btn.addEventListener('click',()=>{
    let product={
        title: title.value,
		description: description.value,
		code: code.value,
		price: price.value,
		status: true,
		stock: stock.value,
		category: category.value,
		thumbnails: [
			
		],
    }
    console.log(product);

})