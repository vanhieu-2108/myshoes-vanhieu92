window.addEventListener("load", () => {
    const modalLogin = document.querySelector(".modal-login");
    const modalSignUp = document.querySelector(".modal-sign-up");
    const signIn = document.querySelector(".sign-in");
    const signUp = document.querySelector(".sign-up");
    const body = document.body;
    const choiceSize = document.querySelector(".choice-size");
    signIn.addEventListener("click", function () {
        modalLogin.classList.add("active");
        modalSignUp.classList.remove("active");
        modalLogin.style = `animation: fadeIn 0.5s forwards linear`;
    });
    body.addEventListener("click", function (e) {
        if (e.target.matches(".modal-login")) {
            modalLogin.classList.remove("active");
        } else if (e.target.matches(".modal-sign-up")) {
            modalSignUp.classList.remove("active");
        } else if (e.target.matches(".choice-size")) {
            choiceSize.classList.remove("active");
        }
    });
    signUp.addEventListener("click", function () {
        modalLogin.classList.remove("active");
        modalSignUp.classList.add("active");
        modalSignUp.style = `animation: fadeIn 0.5s forwards linear`;
    });
    const bag = document.querySelector(".bag");
    const pBag = document.querySelector("p.bag");
    let bagIndex = 0;
    if (pBag) {
        pBag.addEventListener("click", function (e) {
            bagIndex++;
            bag.style = `--text--: "${bagIndex}"`;
        });
    }
    const formSignIn = document.querySelector(".form-sign-in");
    const usernamePSignIn = document.querySelector(".username-sign-in");
    const passworldPSignIn = document.querySelector(".passworld-sign-in");
    let isValid = true;
    formSignIn.addEventListener("submit", function (e) {
        e.preventDefault();
        if (formSignIn[0].value.trim() === "") {
            isValid = false;
            formSignIn[0].style = "border-color: red";
            usernamePSignIn.style = "color: red; opacity: 1";
        } else {
            formSignIn[0].style = "border-color: green";
            usernamePSignIn.style = "opacity: 0";
        }
        if (formSignIn[1].value.trim() === "") {
            isValid = false;
            formSignIn[1].style = "border-color: red";
            passworldPSignIn.style = "color: red; opacity: 1";
        } else {
            formSignIn[1].style = "border-color: green";
            passworldPSignIn.style = "opacity: 0";
        }
        if (isValid) {
            setTimeout(function () {
                alert("Đăng nhập thành công.");
                formSignIn[0].value = "";
                formSignIn[1].value = "";
                formSignIn[0].style = "";
                formSignIn[1].style = "";
                modalLogin.classList.remove("active");
            }, 500);
        }
    });
    const formSignUp = document.querySelector(".form-sign-up");
    formSignUp.addEventListener("submit", function (e) {
        e.preventDefault();
        if (formSignUp.elements[0].value.trim() === "") {
            formSignUp.children[1].style = "opacity: 1; color: red";
            formSignUp.elements[0].style = "border-color: red";
            isValid = false;
        } else if (formSignUp.elements[0].value.length <= 1) {
            isValid = false;
            formSignUp.children[1].style = "opacity: 1; color: red";
            formSignUp.children[1].textContent =
                "Vui lòng nhập họ tên phải lớn hơn một kí tự.";
        } else {
            formSignUp.children[1].style = "opacity: 1;color: green";
            formSignUp.elements[0].style = "border-color: green";
            formSignUp.children[1].textContent = "Họ tên hợp lệ.";
            isValid = true;
        }

        // Email
        let regexEmail =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexEmail.test(formSignUp.elements[1].value.trim())) {
            formSignUp.children[3].style = "opacity: 1;color: green";
            formSignUp.elements[1].style = "border-color: green";
            formSignUp.children[3].textContent = "Email hợp lệ.";
            isValid = true;
        } else if (formSignUp.elements[1].value.trim() === "") {
            formSignUp.children[3].style = "opacity: 1;color: red";
            formSignUp.elements[1].style = "border-color: red";
            formSignUp.children[3].textContent = "Email không được để trống.";
            isValid = false;
        } else {
            formSignUp.children[3].style = "opacity: 1;color: red";
            formSignUp.elements[1].style = "border-color: red";
            formSignUp.children[3].textContent = "Email không hợp lệ.";
            isValid = false;
        }

        // Phone
        const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        if (regexPhoneNumber.test(formSignUp.elements[2].value.trim())) {
            formSignUp.children[5].style = "opacity: 1;color: green";
            formSignUp.elements[2].style = "border-color: green";
            formSignUp.children[5].textContent = "Số điện thoại hợp lệ.";
            isValid = true;
        } else if (formSignUp.elements[2].value.trim() === "") {
            formSignUp.children[5].style = "opacity: 1;color: red";
            formSignUp.elements[2].style = "border-color: red";
            formSignUp.children[5].textContent =
                "Số điện thoại không được để trống.";
            isValid = false;
        } else {
            formSignUp.children[5].style = "opacity: 1;color: red";
            formSignUp.elements[2].style = "border-color: red";
            formSignUp.children[5].textContent = "Số điện thoại không hợp lệ.";
            isValid = false;
        }

        // Pass
        if (formSignUp.elements[3].value.trim() === "") {
            formSignUp.children[7].style = "opacity: 1;color: red";
            formSignUp.elements[3].style = "border-color: red";
            formSignUp.children[7].textContent =
                "Mật khẩu không được để trống.";
            isValid = false;
        } else if (formSignUp.elements[3].value.trim().length < 8) {
            formSignUp.children[7].style = "opacity: 1;color: red";
            formSignUp.elements[3].style = "border-color: red";
            formSignUp.children[7].textContent =
                "Mật khẩu tối đa phải 8 kí tự.";
            isValid = false;
        } else {
            formSignUp.children[7].style = "opacity: 1;color: green";
            formSignUp.elements[3].style = "border-color: green";
            formSignUp.children[7].textContent = "Mật khẩu hợp lệ.";
            isValid = true;
        }

        // Repeat Pass
        if (formSignUp.elements[4].value.trim() === "") {
            formSignUp.children[9].style = "opacity: 1;color: red";
            formSignUp.elements[4].style = "border-color: red";
            formSignUp.children[9].textContent =
                "Nhập lại mật khẩu không được để trống.";
            isValid = false;
        } else if (
            formSignUp.elements[4].value.trim() !==
            formSignUp.elements[3].value.trim()
        ) {
            formSignUp.children[9].style = "opacity: 1;color: red";
            formSignUp.elements[4].style = "border-color: red";
            formSignUp.children[9].textContent =
                "Mật khẩu bạn nhập lại không khớp.";
            isValid = false;
        } else {
            formSignUp.children[9].style = "opacity: 1;color: green";
            formSignUp.elements[4].style = "border-color: green";
            formSignUp.children[9].textContent = "Mật khẩu nhập lại hợp lệ.";
            isValid = true;
        }
        if (isValid) {
            setTimeout(function () {
                alert("Đăng ký thành công.");
                modalSignUp.classList.remove("active");
            }, 500);
        }
    });
});
