const bag = document.querySelector(".bag-hover");
const listShopping = document.querySelector(".list-shopping");
const nothing = document.querySelector(".nothing");
const innerShopping = document.querySelector(".inner-shopping");
bag.addEventListener("click", function () {
listShopping.classList.toggle("active");
});
let cartItems = JSON.parse(localStorage.getItem("listCart")) || [];
console.log(cartItems);
let number = document.querySelector(".number");
let textNum = 0;
function addCart(size, numberof, title, price, img) {
// nothing.remove();
cartItems.push({ size, numberof, title, price, img });
localStorage.setItem("listCart", JSON.stringify(cartItems));
const template = ` <div class="shopping-item">
        <img
            src="${img}"
            alt=""
            class="shopping-thumb"
        />
        <div class="heading">
            <h2 class="title">
               ${title}
            </h2>
            <p class="size">Chọn size: ${size}</p>
        </div>
        <div class="price">
            <span class="numberof">x ${numberof}</span>
            <div class="deal">${price}</div>
        </div>
        <div class="icon">
            <i class="fa-solid fa-x"></i>
        </div>
    </div>
`;
innerShopping.insertAdjacentHTML("afterbegin", template);
[...innerShopping.children].forEach((item) => {
const textPrice = item.querySelector(".deal").textContent;
const newPrice = parseFloat(
textPrice.replace(/đ/g, "").replace(/\./g, "")
);
textNum += newPrice;
});
number.textContent = textNum;
}
if (Array.isArray(cartItems) && cartItems.length > 0) {
cartItems.forEach((item) => {
addCart(item.size, item.numberof, item.title, item.price, item.img);
});
}
let bagcount = 0;
const btnBuy = document.querySelector(".order-right .bag");
bagcount++;
btnBuy.addEventListener("click", function (e) {
const childrenInner = [...innerShopping.children];
childrenInner.forEach((item) => {
if (item.classList.contains("nothing")) {
item.remove();
}
});
// removeNothing[removeNothing.length - 1].remove();
const blockLeft = e.target.parentNode.previousElementSibling;
const numberOf = blockLeft.querySelector(".quantity").textContent;
const main =
e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
const imgSrc = main.querySelector(".img-first").getAttribute("src");
const title = main.querySelector(".product-right .title").textContent;
const price = main.querySelector(".group-price b").textContent;
const size = main.querySelector(".size-item.active").innerText;
addCart(size, numberOf, title, price, imgSrc);
});
document.body.addEventListener("click", function (e) {
if (
!listShopping.contains(e.target) &&
!e.target.matches(".bag-hover")
) {
listShopping.classList.remove("active");
} else if (e.target.matches(".icon")) {
e.target.parentNode.remove();
textNum = 0;
const heading = e.target.previousElementSibling;
const textTitle = heading.querySelector(".title").textContent;
[...innerShopping.children].forEach((item) => {
const textPrice = item.querySelector(".deal").textContent;
const newPrice = parseFloat(
textPrice.replace(/đ/g, "").replace(/\./g, "")
);
textNum += newPrice;
});
number.textContent = textNum;
const template2 = `<p class="nothing">Không Có Sản Phẩm Trong Giỏ Hàng.</p>`;
if ([...innerShopping.children].length === 0) {
innerShopping.innerHTML = template2;
}
let index = [...innerShopping.children].find((item) => {
item.title === textTitle;
});
cartItems.splice(index, 1);
localStorage.setItem("listCart", JSON.stringify(cartItems));
}
if (bagcount <= 0) {
bag.style = `--text--: "0"`;
} else {
bag.style = `--text--: "${[...innerShopping.children].length}"`;
}
});
