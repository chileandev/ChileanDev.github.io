document.addEventListener("DOMContentLoaded", function() {
    const featuredProducts = document.querySelectorAll(".featured-product");
    let currentIndex = 0;

    function showNextProduct() {
        // Oculta todos los productos
        featuredProducts.forEach(product => product.style.display = "none");

        // Muestra el producto actual
        featuredProducts[currentIndex].style.display = "block";

        // Cambia al siguiente producto
        currentIndex = (currentIndex + 1) % featuredProducts.length;
    }

    // Inicia el carrusel
    showNextProduct();
    setInterval(showNextProduct, 2000); // Cambia cada 2 segundos
});