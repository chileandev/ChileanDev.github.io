let currentIndex = 0;

function showNextCarouselItem() {
    const carousel = document.querySelector(".carousel");
    const items = document.querySelectorAll(".carousel-item");
    currentIndex = (currentIndex + 1) % items.length;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(showNextCarouselItem, 3000); 