window.addEventListener("load", () => {
  let listCarts = JSON.parse(localStorage.getItem("listCarts")) || [];
  const contentBottom = document.querySelector(".content-bottom");
  let loadingAnimation = document.querySelector(".loading-animation");
  loadingAnimation.classList.add("hidden");
  const wrapper = document.getElementById("wrapper");
  const productInner = document.querySelector(".product__inner");
  const sumCheckOuts = document.querySelectorAll(".sum-checkout");
  const bagHover = document.querySelector(".bag-hover");
  let total = null;
  let count = 1;
  const contentNothing = `
        <div class="content-nothing-product">
          <div class="desc">Giỏ hàng của bạn đang trống!</div>
          <a href="/" class="btn-continue">Tiếp Tục</a>
        </div>
    `;
  function addProduct({ nameItem, numberOf, price, srcImg }) {
    const productItem = `
        <tr class="product-item">
            <td class="td-image">
                <img src="${srcImg}" alt="" />
            </td>
            <td class="td-name">
                <p class="product-name">
               ${nameItem}
                </p>
            </td>
            <td class="td-qty">
                <div class="input-group">
                <div class="stepper">
                    <input type="text" value="${numberOf}" size="1" class="form-control" />
                    <span class="group-arrow">
                    <button class="icon-up">
                        <i class="fa-solid fa-chevron-up"></i>
                    </button>
                    <button class="icon-down">
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>
                    </span>
                    <button class="icon-close">
                         <i class="fa-solid fa-x"></i>
                    </button>
                </div>
                </div>
            </td>
            <td class="td-price">${price}</td>
        </tr>
  `;
    productInner.insertAdjacentHTML("afterbegin", productItem);
  }
  if (listCarts.length === 0) {
    wrapper.insertAdjacentHTML("beforeend", contentNothing);
    contentBottom.classList.add("hidden");
  } else {
    sumPrice();
    contentBottom.classList.remove("hidden");
    listCarts.forEach((item) => {
      addProduct(item);
    });
  }
  function sumPrice() {
    total = 0;
    listCarts.forEach((item) => {
      const numberOf = item.numberOf;
      const price = item.price;
      const newPrice = Number(price.slice(0, price.length - 1).replace(/\./g, ""));
      total += numberOf * newPrice;
    });
    sumCheckOuts.forEach((item) => (item.textContent = total.toLocaleString("vi-VN")));
    bagHover.style = `--text--: "${listCarts.length}"`;
    if (listCarts.length <= 0) {
      contentBottom.classList.add("hidden");
      wrapper.insertAdjacentHTML("beforeend", contentNothing);
    }
  }
  document.body.addEventListener("click", (e) => {
    if (e.target.matches(".icon-close")) {
      const productItem = e.target.parentNode.parentNode.parentNode.parentNode;
      const srcImage = productItem.querySelector(".td-image img").getAttribute("src");
      const valueForm = productItem.querySelector(".form-control").value;
      let index = listCarts.findIndex((item) => {
        return item.srcImg === srcImage && +item.numberOf === +valueForm;
      });
      listCarts.splice(index, 1);
      productItem.remove();
      localStorage.setItem("listCarts", JSON.stringify(listCarts));
      localStorage.setItem("numCart", JSON.stringify(listCarts.length));
      productInner.innerHTML = "";
      listCarts.forEach((item) => {
        addProduct(item);
      });
      sumPrice();
    } else if (e.target.matches(".icon-up")) {
      let qty = e.target.parentNode.previousElementSibling;
      if (count === +qty.value) {
        count++;
      } else {
        count = +qty.value;
        count++;
      }
      qty.value = count;
    } else if (e.target.matches(".icon-down")) {
      let qty = e.target.parentNode.previousElementSibling;
      if (count <= 1) {
        count = 1;
      }
      if (count === +qty.value) {
        if (count > 1) {
          count--;
        }
      } else {
        count = +qty.value;
        count--;
      }
      qty.value = count;
    } else if (e.target.matches(".icon")) {
      productInner.innerHTML = "";
      listCarts = JSON.parse(localStorage.getItem("listCarts"));
      listCarts.forEach((item) => {
        addProduct(item);
      });
      if (listCarts.length === 0) {
        contentBottom.classList.add("hidden");
        wrapper.insertAdjacentHTML("beforeend", contentNothing);
      }
    }
    if (e.target.matches(".icon-close")) {
      loadingAnimation.classList.remove("hidden");
      location.reload();
      setTimeout(() => {
        loadingAnimation.classList.add("hidden");
      }, 1500);
    }
  });
});

const a = {
  name: "Hieu",
  age: 18,
};
