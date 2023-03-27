window.addEventListener("load", () => {
    const btnNext = document.querySelector(".btn-next");
    const btnPrev = document.querySelector(".btn-prev");
    const sliderMain = document.querySelector(".slider-main");
    const sliderItems = document.querySelectorAll(".slider-item");
    const dotItems = document.querySelectorAll(".slider-dot-item");
    const sliderMainWidth = sliderMain.offsetWidth;
    let positionX = 0;
    let index = 0;
    btnNext.addEventListener("click", function () {
        handleSlider(1);
    });
    btnPrev.addEventListener("click", function () {
        handleSlider(-1);
    });
    [...dotItems].forEach((item) =>
        item.addEventListener("click", function (e) {
            [...dotItems].forEach((el) => el.classList.remove("active"));
            e.target.classList.add("active");
            const slideIndex = parseInt(e.target.dataset.index);
            index = slideIndex;
            positionX = -1 * index * sliderMainWidth;
            sliderMain.style = `transform: translateX(${positionX}px)`;
        })
    );
    function handleSlider(value) {
        if (value === 1) {
            index++;
            if (index >= sliderItems.length) {
                index = 0;
                positionX = 0;
            } else {
                positionX += sliderMainWidth;
            }
            console.log(positionX);
            sliderMain.style = `transform: translateX(${-1 * positionX}px)`;
        } else if (value === -1) {
            index--;
            if (index <= -1) {
                positionX = sliderMainWidth * (sliderItems.length - 1);
                index = sliderItems.length - 1;
            } else {
                positionX = positionX - sliderMainWidth;
            }
            sliderMain.style = `transform: translateX(${-1 * positionX}px)`;
        }
        [...dotItems].forEach((el) => el.classList.remove("active"));
        dotItems[index].classList.add("active");
    }
});
