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
});
