window.addEventListener("load", () => {
  const imgFirst = document.querySelector(".img-first");
  const imgHover = document.querySelector(".img-hover");
  const contentRight = document.querySelector(".content-right");
  const contentRightWidth = contentRight && contentRight.offsetWidth;
  const contentRightHeight = contentRight && contentRight.offsetHeight;
  const items = document.querySelectorAll(".content-left .item");
  imgHover.addEventListener("mousemove", function (e) {
    const pX = e.pageX;
    const pY = e.pageY;
    imgFirst.style = `width: auto; height: auto`;
    let imgFirstWidth = imgFirst.offsetWidth;
    let imgFirstHeight = imgFirst.offsetHeight;
    let spaceX = (imgFirstWidth / 2 - contentRightWidth) * 2;
    imgFirstWidth += spaceX;
    let spaceY = (imgFirstHeight / 2 - contentRightHeight) * 2;
    imgFirstHeight += spaceY;
    let ratioX = imgFirstWidth / contentRightWidth / 2;
    let ratioY = imgFirstHeight / contentRightHeight / 2;
    const x = (pX - contentRight.offsetLeft) * ratioX;
    const y = (pY - contentRight.offsetTop) * ratioY;
    imgFirst.style = `left: ${-x}px; top:${-y}px; width: auto; height: auto`;
  });
  contentRight.addEventListener("mouseleave", function () {
    imgFirst.style = "";
  });
  [...items].forEach((item) =>
    item.addEventListener("click", function () {
      imgFirst.src = item.querySelector("img").getAttribute("src");
    })
  );
  const btnBot = document.querySelector(".btn-bot");
  const btnTop = document.querySelector(".btn-top");
  const slider = document.querySelector(".slider");
  const itemHeight = items[0].offsetHeight;
  let index = 0;
  if (btnBot) {
    btnBot.addEventListener("click", function () {
      btnTop.style = `opacity: 1`;
      handleSlider(-1);
    });
  }
  if (btnTop) {
    btnTop.addEventListener("click", function () {
      btnBot.style = `opacity: 1`;
      handleSlider(1);
    });
  }
  let sliderHeight = 0;
  function handleSlider(value) {
    if (value === 1) {
      index--;
      if (index <= 0) {
        btnTop.style = `opacity: 0`;
        index = 0;
        sliderHeight = 0;
      }
      sliderHeight = 0;
      slider.style = `transform: translateY(${sliderHeight}px)`;
    }
    if (value === -1) {
      btnBot.style = `opacity: 0`;
      index++;
      let sliderHeight = 0;
      sliderHeight += itemHeight;
      console.log(sliderHeight);
      slider.style = `transform: translateY(${-1 * sliderHeight}px)`;
    }
  }
  const sizeItems = document.querySelectorAll(".size-item");
  sizeItems.forEach((item) =>
    item.addEventListener("click", function () {
      document.querySelector(".size-item.active").classList.remove("active");
      item.classList.add("active");
    })
  );
  const btnIncrease = document.querySelector(".increase");
  const btnReduce = document.querySelector(".reduce");
  const quantity = document.querySelector(".quantity");
  let currentIndex = 1;
  btnIncrease.addEventListener("click", () => {
    currentIndex++;
    quantity.textContent = currentIndex;
  });
  btnReduce.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex <= 1) {
      currentIndex = 1;
    }
    quantity.textContent = currentIndex;
  });
});
