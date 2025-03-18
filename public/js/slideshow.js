document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll(".slide");
    let index = 0;

    function showSlide() {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
        });
        slides[index].classList.add("active");

        index = (index + 1) % slides.length;
    }

    showSlide();
    setInterval(showSlide, 2000); // 3 saniyede bir değiştir
});
