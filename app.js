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
    formSignIn.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;
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
            }, 500);
        }
    });
});
