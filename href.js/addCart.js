// Thêm giỏ hàng
const bag = document.querySelector(".bag-hover");
const listShopping = document.querySelector(".list-shopping");
const innerCart = document.querySelector(".inner-shopping");
const btnAddCart = document.querySelector(".block-mid .bag");
const arrChildrenCart = [...innerCart.children];
const nothing = document.querySelector(".nothing");
let listCarts = JSON.parse(localStorage.getItem("listCarts")) || [];
let dk = false;
const returnSum = document.querySelector(".number");
let total = 0;
let countCart = 0;
if (Array.isArray(listCarts) || listCarts.length > 0) {
    const numCart = JSON.parse(localStorage.getItem("numCart")) || "0";
    bag.style = `--text--: "${numCart}`;
    listCarts.forEach((item) => {
        addCart(
            item.srcImg,
            item.nameItem,
            item.price,
            item.size,
            item.numberOf
        );
    });
    returnSum.textContent = JSON.parse(localStorage.getItem("sumPrice"));
}
function addCart(srcImg, nameItem, price, size, numberOf) {
    const template = ` 
             <div class="shopping-item">
             <img
                 src="${srcImg}"
                 alt=""
                 class="shopping-thumb"
             />
             <div class="heading">
                 <h2 class="title">
                 ${nameItem}
                 </h2>
                 <p class="size">Chọn size: ${size}</p>
             </div>
             <div class="price">
                 <span class="numberof">x ${numberOf}</span>
                 <div class="deal">${price}</div>
             </div>
             <div class="icon">
                 <i class="fa-solid fa-x"></i>
             </div>
         </div>
     `;
    innerCart.insertAdjacentHTML("afterbegin", template);
}
let value = 0;
btnAddCart &&
    btnAddCart.addEventListener("click", function (e) {
        arrChildrenCart.forEach((item) => {
            if (item.classList.contains("nothing")) {
                item.style = `opacity: 0`;
            }
        });
        const main = document.querySelector("main");
        const srcImg = main.querySelector(".img-first").getAttribute("src");
        const nameItem = main.querySelector(".product-right .title").innerText;
        const price = main.querySelector(".price b").innerText;
        const size =
            main.querySelector(".size-item.active") &&
            main.querySelector(".size-item.active").innerText;
        const numberOf = main.querySelector(".block-left .quantity").innerText;
        addCart(srcImg, nameItem, price, size, numberOf);
        listCarts.push({ srcImg, nameItem, price, size, numberOf });
        localStorage.setItem("listCarts", JSON.stringify(listCarts));
        total = 0;
        setTimeout(sumPrice, 10);
        countCart = 0;
        setTimeout(handleCart, 10);
        // bag.style = `--text--: "${listCarts.length}"`;
    });
// Click hiện ra giỏ hàng
bag.addEventListener("click", function (e) {
    listShopping.classList.toggle("active");
});
// Xóa sp trong giỏ hàng và các tính năng khác
document.body.addEventListener("click", function (e) {
    if (e.target.matches(".icon")) {
        const shoppingItem = e.target.parentNode;
        shoppingItem.remove();
        const imgSrc =
            e.target.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute(
                "src"
            );
        const checkNumOf =
            e.target.previousElementSibling.firstElementChild.innerText.replace(
                /x/g,
                ""
            );
        console.log(checkNumOf);
        let index = listCarts.findIndex((item) => {
            return (
                item["numberOf"].trim() === checkNumOf.trim() &&
                item.srcImg === imgSrc
            );
        });
        // console.log(index);
        listCarts.splice(index, 1);
        // bag.style = `--text--: "${listCarts.length}"`;
        countCart = 0;
        setTimeout(handleCart, 1);
        localStorage.setItem("listCarts", JSON.stringify(listCarts));
        total = 0;
        setTimeout(sumPrice, 10);
    } else if (
        !listShopping.contains(e.target) &&
        !e.target.matches(".bag-hover")
    ) {
        listShopping.classList.remove("active");
    }
    if (listCarts.length === 0) {
        nothing.style = "opacity: 1";
        localStorage.setItem("dk", JSON.stringify("false"));
    }
});

if (!JSON.parse(localStorage.getItem(dk))) {
    if (listCarts.length > 0) {
        nothing.style = "opacity: 0";
    }
}
function sumPrice() {
    listCarts.forEach((item) => {
        const numberOf = item.numberOf;
        const price = item.price;
        const newPrice = Number(
            price.slice(0, price.length - 1).replace(/\./g, "")
        );
        total += numberOf * newPrice;
    });
    returnSum.textContent = total.toLocaleString("vi-VN");
    localStorage.setItem("sumPrice", JSON.stringify(returnSum.textContent));
}

function handleCart() {
    listCarts.forEach((item) => {
        let numOf = parseInt(item.numberOf);
        countCart += numOf;
    });
    bag.style = `--text--: "${countCart}"`;
    localStorage.setItem("numCart", JSON.stringify(countCart));
}
