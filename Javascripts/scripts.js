let currentProduct = 0;
const products = document.querySelectorAll('.featured-product');

function showNextProduct() {
    products[currentProduct].style.display = 'none';
    currentProduct = (currentProduct + 1) % products.length;
    products[currentProduct].style.display = 'block';
}

setInterval(showNextProduct, 2000);
showNextProduct();