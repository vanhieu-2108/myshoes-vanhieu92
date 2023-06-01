window.addEventListener("load", () => {
    function toast({ title = "", message = "", type = "info", duration = 3000 }) {
        const main = document.getElementById("toast");
        if (main) {
            const toast = document.createElement("div");

            // Auto Remove Toast
            const autoRemoveId = setTimeout(() => {
                main.removeChild(toast);
            }, duration + 1000);

            // Remove Toast When Click
            toast.onclick = function (e) {
                if (e.target.closest(".toast__close")) {
                    main.removeChild(toast);
                    clearInterval(autoRemoveId);
                }
            };

            const icons = {
                success: "fa-solid fa-circle-check",
                info: "fa-solid fa-circle-info",
                warning: "fa-solid fa-circle-exclamation",
                error: "fa-solid fa-circle-exclamation",
            };
            let icon = icons[type];
            toast.className = `toast toast--${type}`;
            const delay = (duration / 1000).toFixed(2);
            toast.style.animation = `slideInLeft ease 0.3s, fadeOut 1s ${delay}s forwards`;
            toast.innerHTML = `
           <div class="toast__icon">
               <i class="${icon}"></i>
           </div>
           <div class="toast__body">
               <h3 class="toast__title">${title}</h3>
               <p class="toast__msg">${message}</p>
           </div>
           <div class="toast__close">
               <i class="fa-solid fa-x"></i>
           </div>
       `;
            main.appendChild(toast);
        }
    }
    function showSuccesToast() {
        toast({
            title: "Thành Công!",
            message: "Thêm giỏ hàng thành công.",
            type: "success",
            duration: 2000,
        });
    }

    function showErrorToast() {
        toast({
            title: "Thất Bại!",
            message: "Có lỗi xảy ra, vui lòng liên hệ quản trị viên.",
            type: "error",
            duration: 2000,
        });
    }
    const bag = document.querySelector(".order-right .block-mid .bag");
    if (bag) {
        bag.addEventListener("click", () => {
            showSuccesToast();
        });
    }
});
